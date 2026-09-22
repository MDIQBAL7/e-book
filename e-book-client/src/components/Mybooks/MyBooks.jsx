import { use, useMemo, useState } from "react";
import {
  FiBookOpen,
  FiSearch,
  FiClock,
  FiCheckCircle,
  FiBook,
  FiPlay,
} from "react-icons/fi";

import { AuthContext } from "../../context/AuthContext";
import SingleMyBook from "./SingleMyBook";

const filters = ["All", "Reading", "Completed", "Not Started"];

const MyBooks = () => {
  const { mybooks } = use(AuthContext);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  console.log("My Books:", mybooks);

  // Search + Filter
  const filteredBooks = useMemo(() => {
    if (!mybooks) return [];

    return mybooks.filter((item) => {
      const book = item.book;

      const matchesSearch =
        book?.bookName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        book?.writerName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      // Reading status calculate
      let status = "Not Started";

      if (item.currentPage > 0 && item.currentPage < book?.pages) {
        status = "Reading";
      }

      if (item.currentPage >= book?.pages) {
        status = "Completed";
      }

      const matchesFilter =
        activeFilter === "All" || status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [mybooks, search, activeFilter]);

  // Statistics
  const totalBooks = mybooks?.length || 0;

  const readingBooks =
    mybooks?.filter((item) => {
      const pages = item.book?.pages || 0;

      return item.currentPage > 0 && item.currentPage < pages;
    }).length || 0;

  const completedBooks =
    mybooks?.filter((item) => {
      const pages = item.book?.pages || 0;

      return item.currentPage >= pages;
    }).length || 0;

  return (
    <section className="min-h-screen bg-base-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <FiBookOpen size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                My Books
              </h1>

              <p className="text-sm text-base-content/60">
                Manage your purchased books and continue reading.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total */}
          <div className="rounded-2xl border border-base-300 bg-base-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/60">
                  Total Books
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {totalBooks}
                </h2>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <FiBook size={22} />
              </div>
            </div>
          </div>

          {/* Reading */}
          <div className="rounded-2xl border border-base-300 bg-base-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/60">
                  Reading
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {readingBooks}
                </h2>
              </div>

              <div className="rounded-xl bg-secondary/10 p-3 text-secondary">
                <FiClock size={22} />
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-base-300 bg-base-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/60">
                  Completed
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {completedBooks}
                </h2>
              </div>

              <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                <FiCheckCircle size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
              size={19}
            />

            <input
              type="text"
              placeholder="Search by book name or writer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input w-full rounded-xl border-base-300 bg-base-200 pl-11"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`btn rounded-xl ${
                  activeFilter === filter
                    ? "btn-primary"
                    : "btn-ghost border border-base-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Books */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredBooks.map((item) => (
              <SingleMyBook
                key={item._id}
                book={item}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
};

const EmptyState = () => {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-base-300 bg-base-200 px-6 text-center">
      <div className="mb-4 rounded-full bg-primary/10 p-5 text-primary">
        <FiBookOpen size={32} />
      </div>

      <h2 className="text-xl font-bold">
        No books found
      </h2>

      <p className="mt-2 max-w-md text-sm text-base-content/60">
        Your purchased books will appear here.
      </p>
    </div>
  );
};

export default MyBooks;