import React, { use, useMemo, useState } from "react";
import Fuse from "fuse.js";
import {
  FaBookOpen,
  FaFire,
  FaStar,
  FaSortAmountDown,
  FaSearch,
} from "react-icons/fa";
import BookCard from "./BookCard";

// =========================
// Demo Book Data
// =========================

// const booksData = [
//   {
//     id: 1,
//     title: "Atomic Habits",
//     writer: "James Clear",
//     price: 15,
//     pages: 320,
//     sold: 18500,
//     rating: 4.8,
//     category: "Self Development",
//     addedAt: "2026-08-20",
//     image:
//       "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 2,
//     title: "The Psychology of Money",
//     writer: "Morgan Housel",
//     price: 18,
//     pages: 256,
//     sold: 14200,
//     rating: 4.7,
//     category: "Finance",
//     addedAt: "2026-08-25",
//     image:
//       "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 3,
//     title: "Deep Work",
//     writer: "Cal Newport",
//     price: 17,
//     pages: 304,
//     sold: 11800,
//     rating: 4.6,
//     category: "Productivity",
//     addedAt: "2026-08-28",
//     image:
//       "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 4,
//     title: "The Power of Now",
//     writer: "Eckhart Tolle",
//     price: 14,
//     pages: 236,
//     sold: 9600,
//     rating: 4.5,
//     category: "Mindfulness",
//     addedAt: "2026-09-01",
//     image:
//       "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 5,
//     title: "Rich Dad Poor Dad",
//     writer: "Robert Kiyosaki",
//     price: 16,
//     pages: 336,
//     sold: 21000,
//     rating: 4.8,
//     category: "Finance",
//     addedAt: "2026-08-15",
//     image:
//       "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 6,
//     title: "Think and Grow Rich",
//     writer: "Napoleon Hill",
//     price: 13,
//     pages: 320,
//     sold: 17800,
//     rating: 4.6,
//     category: "Success",
//     addedAt: "2026-08-10",
//     image:
//       "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 7,
//     title: "The 7 Habits of Highly Effective People",
//     writer: "Stephen R. Covey",
//     price: 20,
//     pages: 432,
//     sold: 8900,
//     rating: 4.7,
//     category: "Personal Growth",
//     addedAt: "2026-09-05",
//     image:
//       "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 8,
//     title: "Can't Hurt Me",
//     writer: "David Goggins",
//     price: 19,
//     pages: 364,
//     sold: 15600,
//     rating: 4.9,
//     category: "Motivation",
//     addedAt: "2026-09-08",
//     image:
//       "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
//   },
// ];

// =========================
// Book Card
// =========================



// =========================
// Main Component
// =========================

const BookCollection = ({bookres}) => {
    const booksData = use(bookres)
    
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("bestSeller");

  // =========================
  // Fuse Search
  // =========================

const fuse = useMemo(() => {
  return new Fuse(booksData, {
    keys: [
      {
        name: "bookName",
        weight: 0.7,
      },
      {
        name: "writerName",
        weight: 0.3,
      },
    ],
    threshold: 0.4,
    ignoreLocation: true,
  });
}, [booksData]);

  // =========================
  // Search + Sort
  // =========================

  const filteredAndSortedBooks = useMemo(() => {
    let results = [];

    // No search
    if (!search.trim()) {
      results = [...booksData];
    } else {
      // Fuzzy search
      results = fuse.search(search).map((result) => result.item);
    }

    // Sorting
    switch (sortBy) {
      case "bestSeller":
        results.sort((a, b) => b.sold - a.sold);
        break;

      case "newIn":
        results.sort(
          (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
        );
        break;

      case "priceLow":
        results.sort((a, b) => a.price - b.price);
        break;

      case "priceHigh":
        results.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    return results;
  }, [search, sortBy, fuse]);

  return (
    <section className="bg-base-100 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            Section Header
        ========================= */}

        <div className="text-center max-w-2xl mx-auto">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Explore Our Collection
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mt-3">
            Find Your Next
            <span className="text-primary"> Great Read</span>
          </h2>

          <p className="text-base-content/60 mt-4">
            Discover books from bestselling authors and explore ideas
            that can transform the way you think.
          </p>
        </div>

        {/* =========================
            Search + Sort Area
        ========================= */}

        <div className="mt-10 flex flex-col lg:flex-row gap-4 justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-xl">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by book name or writer..."
              className="input input-bordered w-full pl-11 pr-4 h-12 rounded-xl bg-base-200 border-base-300 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Sorting */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSortBy("bestSeller")}
              className={`btn rounded-xl ${
                sortBy === "bestSeller"
                  ? "btn-primary"
                  : "btn-outline"
              }`}
            >
              <FaFire />
              Best Seller
            </button>

            <button
              onClick={() => setSortBy("newIn")}
              className={`btn rounded-xl ${
                sortBy === "newIn"
                  ? "btn-primary"
                  : "btn-outline"
              }`}
            >
              New In
            </button>

            <button
              onClick={() => setSortBy("priceLow")}
              className={`btn rounded-xl ${
                sortBy === "priceLow"
                  ? "btn-primary"
                  : "btn-outline"
              }`}
            >
              <FaSortAmountDown />
              Low Price
            </button>

            <button
              onClick={() => setSortBy("priceHigh")}
              className={`btn rounded-xl ${
                sortBy === "priceHigh"
                  ? "btn-primary"
                  : "btn-outline"
              }`}
            >
              <FaSortAmountDown className="rotate-180" />
              High Price
            </button>
          </div>
        </div>

        {/* =========================
            Search Result Info
        ========================= */}

        <div className="flex items-center justify-between mt-8 mb-5">
          <p className="text-sm text-base-content/60">
            {search ? (
              <>
                Showing{" "}
                <span className="font-semibold text-base-content">
                  {filteredAndSortedBooks.length}
                </span>{" "}
                result
                {filteredAndSortedBooks.length !== 1 && "s"} for{" "}
                <span className="font-semibold text-primary">
                  "{search}"
                </span>
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-base-content">
                  {filteredAndSortedBooks.length}
                </span>{" "}
                books
              </>
            )}
          </p>
        </div>

        {/* =========================
            Books Grid
        ========================= */}

        {filteredAndSortedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          /* =========================
             No Results
          ========================= */

          <div className="min-h-80 flex flex-col items-center justify-center text-center bg-base-200 rounded-2xl border border-base-300">
            <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center">
              <FaSearch className="text-2xl text-base-content/40" />
            </div>

            <h3 className="text-xl font-bold text-base-content mt-5">
              No books found
            </h3>

            <p className="text-base-content/60 mt-2 max-w-md px-4">
              We couldn't find a book matching "{search}". Try
              another title or writer name.
            </p>

            <button
              onClick={() => setSearch("")}
              className="btn btn-primary mt-5 rounded-xl"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* =========================
            Bottom Button
        ========================= */}

        {filteredAndSortedBooks.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn btn-outline btn-primary rounded-xl px-8">
              <FaBookOpen />
              View All Books
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookCollection;