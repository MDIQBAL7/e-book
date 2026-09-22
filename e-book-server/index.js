const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const client = new MongoClient(process.env.MONGODB_URI);
const multer = require("multer");
const cloudinary = require("./config/cloudinary");

const port = process.env.PORT || 3000;
// password  : 1KAkv0E7ukqhHSv1
// username  : e-book
// middle ware
app.use(cors());
app.use(express.json());

// multer setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connected successfully");
    const db = client.db("e-book");
    const userColl = db.collection("users");
    const booksColl = db.collection("books");
    const bidColl = db.collection("bids");
    const myBooksColl = db.collection("mybooks");
    const buyerColl = db.collection("buyer");
    // apis here
    app.get("/", (req, res) => {
      res.send("server is running");
    });
    // user api
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const email = req.body.Email;
      const query = { Email: email };
      const existingUser = await userColl.findOne(query);
      if (existingUser) {
        res.send({ messege: "user already have an acount" });
      } else {
        const result = await userColl.insertOne(newUser);
        res.send(result);
      }
    });
    app.get("/users", async (req, res) => {
      const cursor = userColl.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // books api
    app.post(
      "/books",
      upload.fields([
        { name: "cover", maxCount: 1 },
        { name: "pdf", maxCount: 1 },
      ]),
      async (req, res) => {
        try {
          const { bookName, writerName, pages, price, published, language } =
            req.body;
          console.log("data for published", req.body);
          const coverFile = req.files?.cover?.[0];
          const pdfFile = req.files?.pdf?.[0];

          // Required field validation
          if (
            !bookName ||
            !writerName ||
            !pages ||
            !price ||
            !published ||
            !language
          ) {
            return res.status(400).send({
              message: "All book information is required",
            });
          }

          if (!coverFile) {
            return res.status(400).send({
              message: "Book cover is required",
            });
          }

          if (!pdfFile) {
            return res.status(400).send({
              message: "PDF file is required",
            });
          }

          // Upload cover image
          const coverUpload = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "ebook/covers",
                resource_type: "image",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              },
            );

            stream.end(coverFile.buffer);
          });

          // Upload PDF
          const pdfUpload = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "ebook/pdfs",
                resource_type: "raw",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              },
            );

            stream.end(pdfFile.buffer);
          });

          // Create book document
          const newBook = {
            bookName,
            writerName,
            pages: Number(pages),
            price: Number(price),
            published,
            totalSold: 0,
            language,

            imageUrl: coverUpload.secure_url,

            pdfUrl: pdfUpload.secure_url,

            createdAt: new Date(),
          };

          const result = await booksColl.insertOne(newBook);

          res.send({
            success: true,
            message: "Book uploaded successfully",
            insertedId: result.insertedId,
          });
        } catch (error) {
          console.error("Book upload error:", error);

          res.status(500).send({
            success: false,
            message: "Failed to upload book",
          });
        }
      },
    );
    app.get("/books", async (req, res) => {
      // const projectFields = {bookName : 1};
      // const cursor = booksColl.find().sort({price : 1}).skip(3).limit(5).project(projectFields);
      const limit = parseInt(req.query.limit) || 0;
      const result = await booksColl.find().limit(limit).toArray();
      res.send(result);
    });
    app.get("/books/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await booksColl.findOne(query);
      res.send(result);
    });
    app.delete("/books/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await booksColl.deleteOne(query);
      res.send(result);
    });
    app.patch("/books/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: data.name,
          price: data.price,
        },
      };
      const result = await booksColl.updateOne(query, update);
      res.send(result);
    });

    app.get("/books/:bookId/access/:email", async (req, res) => {
      try {
        const { bookId, email } = req.params;
        console.log("========== BOOK ACCESS ==========");
        console.log("Book ID:", bookId);
        console.log("Email:", email);
        // Check whether the user purchased this book
        const purchase = await buyerColl.findOne({
          buyerEmail: email,
          bookId: bookId,
        });
        console.log("Purchase:", purchase);

        // User did not purchase the book
        if (!purchase) {
          return res.status(403).send({
            success: false,
            message: "You have not purchased this book",
          });
        }

        // Find the book
        const book = await booksColl.findOne({
          _id: new ObjectId(bookId),
        });

        if (!book) {
          return res.status(404).send({
            success: false,
            message: "Book not found",
          });
        }

        // User has access
        res.send({
          success: true,

          book: {
            _id: book._id,
            bookName: book.bookName,
            writerName: book.writerName,
            pages: book.pages,
            pdfUrl: book.pdfUrl,
          },

          purchase: {
            _id: purchase._id,
            currentPage: purchase.currentPage || 0,
            lastReadAt: purchase.lastReadAt || null,
          },
        });
      } catch (error) {
        console.error("Book access error:", error);

        res.status(500).send({
          success: false,
          message: "Failed to check book access",
        });
      }
    });

    // buyer api
    app.post("/buyer", async (req, res) => {
      const newBuyer = req.body;
      const result = await buyerColl.insertOne(newBuyer);
      res.send(result);
    });
    app.get("/buyer", async (req, res) => {
      const cursor = buyerColl.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // my books api
    app.patch("/mybooks/:id/progress", async (req, res) => {
      try {
        const id = req.params.id;

        const { currentPage } = req.body;

        const result = await buyerColl.updateOne(
          {
            _id: new ObjectId(id),
          },
          {
            $set: {
              currentPage: currentPage,
              lastReadAt: new Date(),
            },
          },
        );

        res.send(result);
      } catch (error) {
        console.error(error);

        res.status(500).send({
          message: "Failed to save reading progress",
        });
      }
    });

    app.post("/mybooks", async (req, res) => {
      const mybook = req.body;
      const result = await myBooksColl.insertOne(mybook);
      res.send(result);
    });

    app.get("/mybooks/email/:email", async (req, res) => {
      try {
        const email = req.params.email;

        const result = await buyerColl
          .aggregate([
            {
              $match: {
                buyerEmail: email,
              },
            },

            {
              $lookup: {
                from: "books",

                let: {
                  bookObjectId: {
                    $toObjectId: "$bookId",
                  },
                },

                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$bookObjectId"],
                      },
                    },
                  },
                ],

                as: "book",
              },
            },

            {
              $unwind: "$book",
            },
          ])
          .toArray();

        res.send(result);
      } catch (error) {
        console.error(error);

        res.status(500).send({
          message: "Failed to get my books",
        });
      }
    });

    // my books api

    app.post("/bids", async (req, res) => {
      const newBid = req.body;
      const result = await bidColl.insertOne(newBid);
      res.send(result);
    });
    app.get("/bids", async (req, res) => {
      const id = req.query._id;
      const query = {};
      if (id) {
        query._id = new ObjectId(id);
      }
      const cursor = bidColl.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("simple crud server is running ");
});
