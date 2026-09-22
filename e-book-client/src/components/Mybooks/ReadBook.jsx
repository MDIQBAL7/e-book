import { use, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Document, Page, pdfjs } from "react-pdf";

import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiLock,
} from "react-icons/fi";

import { AuthContext } from "../../context/AuthContext";

// PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const ReadBook = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = use(AuthContext);

  const [book, setBook] = useState(null);
  const [purchaseId, setPurchaseId] = useState(null);

  const [currentPage, setCurrentPage] = useState(
    location.state?.currentPage || 1,
  );

  const [numPages, setNumPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  // =========================
  // Get book access
  // =========================

  useEffect(() => {
    if (!user?.email || !bookId) return;

    const fetchBookAccess = async () => {
      try {
        setLoading(true);
        setAccessDenied(false);

        const res = await fetch(
          `http://localhost:3000/books/${bookId}/access/${encodeURIComponent(
            user.email,
          )}`,
        );

        const data = await res.json();

        console.log("Book Access:", data);

        if (res.status === 403) {
          setAccessDenied(true);
          return;
        }

        if (!res.ok) {
          throw new Error(data.message || "Failed to load book");
        }

        setBook(data.book);

        // Buyer document ID
        setPurchaseId(data.purchase?._id);

        // Saved reading page
        setCurrentPage(data.purchase?.currentPage || 1);
      } catch (error) {
        console.error("Book access error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookAccess();
  }, [bookId, user?.email]);

  // =========================
  // PDF loaded
  // =========================

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);

    console.log("Total PDF pages:", numPages);
  };

  // =========================
  // Save progress
  // =========================

  const saveProgress = async (page) => {
    if (!purchaseId) {
      console.log("Purchase ID not found");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/mybooks/${purchaseId}/progress`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            currentPage: page,
          }),
        },
      );

      const data = await res.json();

      console.log("Progress saved:", data);
    } catch (error) {
      console.error("Progress save error:", error);
    }
  };

  // =========================
  // Next page
  // =========================

  const nextPage = () => {
    if (currentPage < numPages) {
      const next = currentPage + 1;

      setCurrentPage(next);
      saveProgress(next);
    }
  };

  // =========================
  // Previous page
  // =========================

  const previousPage = () => {
    if (currentPage > 1) {
      const previous = currentPage - 1;

      setCurrentPage(previous);
      saveProgress(previous);
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // =========================
  // Access denied
  // =========================

  if (accessDenied) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-base-100 px-4">
        <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-200 p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error">
            <FiLock size={30} />
          </div>

          <h1 className="text-2xl font-bold">
            Access Denied
          </h1>

          <p className="mt-2 text-base-content/60">
            You need to purchase this book before you can read it.
          </p>

          <button
            onClick={() => navigate(`/books/${bookId}`)}
            className="btn btn-primary mt-6 rounded-xl"
          >
            Go to Book
          </button>
        </div>
      </section>
    );
  }

  // =========================
  // Book not found
  // =========================

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Book not found.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/my-books")}
              className="btn btn-ghost btn-circle"
            >
              <FiArrowLeft size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <FiBookOpen
                  className="text-primary"
                  size={22}
                />

                <h1 className="text-xl font-bold sm:text-2xl">
                  {book.bookName}
                </h1>
              </div>

              <p className="text-sm text-base-content/60">
                by {book.writerName}
              </p>
            </div>
          </div>

          {/* Page number */}
          <div className="badge badge-primary badge-lg">
            Page {currentPage} / {numPages || book.pages}
          </div>
        </div>

        {/* PDF */}
        <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-200 shadow-sm">

          <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">

            <div>
              <h2 className="font-semibold">
                {book.bookName}
              </h2>

              <p className="text-sm text-base-content/50">
                PDF Reader
              </p>
            </div>

            {currentPage === numPages && numPages > 0 && (
              <div className="flex items-center gap-1 text-sm font-medium text-success">
                <FiCheckCircle />
                Completed
              </div>
            )}
          </div>

          {/* PDF Page */}
          <div className="flex justify-center overflow-auto bg-base-300 p-4 sm:p-8">

            <Document
              file={book.pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex h-[70vh] items-center justify-center">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              }
              error={
                <div className="flex h-[70vh] items-center justify-center">
                  <p className="text-error">
                    Failed to load PDF.
                  </p>
                </div>
              }
            >
              <Page
                pageNumber={currentPage}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-xl"
                width={Math.min(window.innerWidth - 50, 850)}
              />
            </Document>
          </div>

          {/* Controls */}
          <div className="border-t border-base-300 bg-base-200 p-4">

            <div className="flex items-center justify-between gap-4">

              <button
                onClick={previousPage}
                disabled={currentPage <= 1}
                className="btn btn-outline rounded-xl"
              >
                <FiArrowLeft />
                Previous
              </button>

              <div className="text-center">
                <p className="text-sm font-semibold">
                  Page {currentPage} of {numPages}
                </p>

                <p className="text-xs text-base-content/50">
                  Your progress is automatically saved
                </p>
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage >= numPages}
                className="btn btn-primary rounded-xl"
              >
                Next
                <FiArrowRight />
              </button>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadBook;