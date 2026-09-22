import { FiBookOpen, FiClock, FiCheckCircle, FiPlay } from "react-icons/fi";
import { useNavigate } from "react-router";

const SingleMyBook = ({ book: item }) => {
  const book = item?.book;
  const navigate = useNavigate();
console.log("My Book Item:", item);
console.log("Book ID:", item.bookId);
  if (!book) {
    return null;
  }

  const currentPage = item.currentPage || 0;
  const totalPages = book.pages || 0;

  const progress =
    totalPages > 0
      ? Math.min(Math.round((currentPage / totalPages) * 100), 100)
      : 0;

  let status = "Not Started";

  if (currentPage > 0 && currentPage < totalPages) {
    status = "Reading";
  }

  if (currentPage >= totalPages) {
    status = "Completed";
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={book.imageUrl?.[0]}
          alt={book.bookName}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Status */}
        <div className="absolute right-3 top-3">
          {status === "Completed" ? (
            <span className="badge gap-1 border-0 bg-green-500 text-white">
              <FiCheckCircle />
              Completed
            </span>
          ) : status === "Reading" ? (
            <span className="badge gap-1 border-0 bg-secondary text-white">
              <FiClock />
              Reading
            </span>
          ) : (
            <span className="badge gap-1 border-0 bg-primary text-white">
              <FiBookOpen />
              Not Started
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="line-clamp-1 text-xl font-bold">{book.bookName}</h2>

        <p className="mt-1 text-sm text-base-content/60">
          by {book.writerName}
        </p>

        {/* Book info */}
        <div className="mt-4 flex items-center justify-between text-sm text-base-content/60">
          <span>{book.pages} pages</span>

          <span>{book.language}</span>
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">Reading Progress</span>

            <span className="font-semibold text-primary">{progress}%</span>
          </div>

          <progress
            className="progress progress-primary h-2 w-full"
            value={progress}
            max="100"
          ></progress>

          <p className="mt-2 text-xs text-base-content/50">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() =>
            navigate(`/read/${item.bookId}`, {
              state: {
                purchaseId: item._id,
                currentPage: item.currentPage,
              },
            })
          }
          className="btn btn-primary mt-5 w-full rounded-xl"
        >
          <FiPlay size={17} />

          {status === "Not Started"
            ? "Start Reading"
            : status === "Completed"
              ? "Read Again"
              : "Continue Reading"}
        </button>
      </div>
    </div>
  );
};

export default SingleMyBook;
