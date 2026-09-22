import { useState } from "react";
import Swal from "sweetalert2";

const AddBook = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    bookName: "",
    writerName: "",
    pages: "",
    price: "",
    published: "",
    language: "English",
  });

  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cover) {
      Swal.fire({
        icon: "warning",
        title: "Please select a cover image",
      });
      return;
    }

    if (!pdf) {
      Swal.fire({
        icon: "warning",
        title: "Please select a PDF",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("bookName", form.bookName);
      formData.append("writerName", form.writerName);
      formData.append("pages", form.pages);
      formData.append("price", form.price);
      formData.append("published", form.published);
      formData.append("language", form.language);

      formData.append("cover", cover);
      formData.append("pdf", pdf);

      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log(data);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Book uploaded successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset form
        setForm({
          bookName: "",
          writerName: "",
          pages: "",
          price: "",
          published: "",
          language: "English",
        });

        setCover(null);
        setPdf(null);

        e.target.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload failed",
          text: data.message,
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-base-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">
            Add New Book
          </h1>

          <p className="mt-2 text-base-content/60">
            Upload a new book to your e-book store.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-base-300 bg-base-200 p-6 shadow-sm sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Book Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Book Name
              </label>

              <input
                type="text"
                name="bookName"
                value={form.bookName}
                onChange={handleChange}
                placeholder="Enter book name"
                className="input w-full border-base-300 bg-base-100"
                required
              />
            </div>

            {/* Writer */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Writer Name
              </label>

              <input
                type="text"
                name="writerName"
                value={form.writerName}
                onChange={handleChange}
                placeholder="Enter writer name"
                className="input w-full border-base-300 bg-base-100"
                required
              />
            </div>

            {/* Pages */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Total Pages
              </label>

              <input
                type="number"
                name="pages"
                value={form.pages}
                onChange={handleChange}
                placeholder="336"
                min="1"
                className="input w-full border-base-300 bg-base-100"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="12.99"
                min="0"
                step="0.01"
                className="input w-full border-base-300 bg-base-100"
                required
              />
            </div>

            {/* Published */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Published Date
              </label>

              <input
                type="date"
                name="published"
                value={form.published}
                onChange={handleChange}
                className="input w-full border-base-300 bg-base-100"
                required
              />
            </div>

            {/* Language */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Language
              </label>

              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                className="select w-full border-base-300 bg-base-100"
              >
                <option value="English">English</option>
                <option value="Bangla">Bangla</option>
                <option value="Hindi">Hindi</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>

            {/* Cover */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Book Cover
              </label>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => setCover(e.target.files[0])}
                className="file-input w-full border-base-300 bg-base-100"
                required
              />

              <p className="mt-2 text-xs text-base-content/50">
                JPG, PNG or WEBP
              </p>
            </div>

            {/* PDF */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Book PDF
              </label>

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdf(e.target.files[0])}
                className="file-input w-full border-base-300 bg-base-100"
                required
              />

              <p className="mt-2 text-xs text-base-content/50">
                PDF only. Maximum size: 50MB.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary mt-8 w-full rounded-xl"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Uploading...
              </>
            ) : (
              "Upload Book"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddBook;