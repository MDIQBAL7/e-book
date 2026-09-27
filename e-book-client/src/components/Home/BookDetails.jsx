import React, { use, useState } from "react";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaGlobe,
  FaStar,
  FaTag,
  FaUser,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { CgDice3 } from "react-icons/cg";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { user, fetchMyBooks } = use(AuthContext);
  const book = useLoaderData();
  console.log('books id test', typeof book._id);

  //   const book = {
  //     bookName: "Atomic Habits",
  //     writer: "James Clear",
  //     pages: 320,
  //     price: 850,
  //     published: "October 16, 2018",
  //     totalSold: 1250,
  //     language: "English",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/81ANaVZk5LL.jpg",
  //     description:
  //       "An easy and proven way to build good habits and break bad ones. This book provides practical strategies that can help you improve your habits and achieve your goals.",
  //   };

  // ================= REVIEWS =================

  const reviews = [
    {
      id: 1,
      name: "Rahim Ahmed",
      rating: 5,
      comment:
        "Excellent book. The ideas are simple, practical and very easy to apply in daily life.",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      rating: 5,
      comment:
        "One of the best books I have read. The writing style is very easy to understand.",
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Karim Hasan",
      rating: 4,
      comment:
        "Very useful book. Some chapters were extremely helpful for building better habits.",
      date: "2 weeks ago",
    },
  ];

  // ================= STATES =================

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  // ================= COUPON =================

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    // Demo coupon
    if (code === "BOOK20") {
      setDiscount(20);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setDiscount(0);
      setCouponApplied(false);
      setCouponError("Invalid coupon code.");
    }
  };

  // ================= BUY NOW =================

  const handleBuyNow = async () => {
    console.log("Buy Now clicked");

    // save buyer data to database
    const buyer = {
      buyerEmail: user.email,
      bookId: book._id,
      purchasedAt : new Date(),
      currentPage : 0,
      lastReadAt : null
    };
    fetch("https://e-book-server-delta.vercel.app/buyer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(buyer),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        fetchMyBooks();
        console.log("shop donw", data);
      });
    // Later:
    // Navigate to checkout page
    // navigate("/checkout")
  };

  // ================= PRICE =================

  const discountAmount = (book.price * discount) / 100;
  const finalPrice = book.price - discountAmount;

  return (
    <section className="min-h-screen bg-base-100 py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ================= BREADCRUMB ================= */}

        <div className="mb-8 text-sm text-base-content/50">
          Home / Books /{" "}
          <span className="font-medium text-primary">{book.bookName}</span>
        </div>

        {/* ================= BOOK DETAILS ================= */}

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* ================= BOOK IMAGE ================= */}

          <div className="flex justify-center">
            <div className="group relative w-full max-w-md">
              {/* Glow */}
              <div className="absolute inset-10 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />

              {/* Image Card */}
              <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-200 p-6 shadow-xl">
                <img
                  src={book.imageUrl}
                  alt={book.bookName}
                  className="mx-auto h-[420px] w-auto rounded-xl object-cover shadow-2xl transition duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] sm:h-[500px]"
                />
              </div>

              {/* Sold Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-base-300 bg-base-100 px-5 py-2 text-sm font-semibold shadow-lg">
                📚 {book.totalSold.toLocaleString()}+ copies sold
              </div>
            </div>
          </div>

          {/* ================= BOOK INFORMATION ================= */}

          <div>
            {/* Category */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <FaBookOpen />
              E-Book
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-base-content sm:text-5xl">
              {book.bookName}
            </h1>

            {/* Author */}
            <p className="mt-3 text-lg text-base-content/60">
              by{" "}
              <span className="font-semibold text-primary">{book.writer}</span>
            </p>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg bg-warning/10 px-3 py-2 text-warning">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} />
                ))}

                <span className="ml-1 font-bold text-base-content">4.9</span>
              </div>

              <span className="text-sm text-base-content/50">
                Based on 328 buyer reviews
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-base-content/65">
              {book.description}
            </p>

            {/* ================= INFO GRID ================= */}

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <InfoItem
                icon={<FaBookOpen />}
                label="Pages"
                value={book.pages}
              />

              <InfoItem
                icon={<FaCalendarAlt />}
                label="Published"
                value={book.published}
              />

              <InfoItem
                icon={<FaGlobe />}
                label="Language"
                value={book.language}
              />

              <InfoItem
                icon={<FaShoppingCart />}
                label="Total Sold"
                value={book.totalSold.toLocaleString()}
              />
            </div>
            <div className="mt-5">
              <InfoItem
                icon={<FaShoppingCart />}
                label="Book Id"
                value={book._id}
              />
            </div>
            {/* ================= PURCHASE CARD ================= */}

            <div className="mt-8 rounded-2xl border border-base-300 bg-base-200 p-5 sm:p-6">
              {/* Price */}
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-base-content/50">Price</p>

                  <div className="mt-1 flex items-center gap-3">
                    {couponApplied && (
                      <span className="text-lg text-base-content/40 line-through">
                        ৳{book.price}
                      </span>
                    )}

                    <span className="text-3xl font-extrabold text-primary">
                      ৳{finalPrice}
                    </span>
                  </div>
                </div>

                {couponApplied && (
                  <div className="rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success">
                    {discount}% OFF
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {/* Coupon */}
                <button
                  onClick={() => setShowCouponModal(true)}
                  className="btn btn-outline h-14 rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-white"
                >
                  <FaTag />
                  Have a Coupon?
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="btn btn-primary h-14 rounded-xl text-white shadow-lg shadow-primary/20 transition hover:-translate-y-1"
                >
                  <FaShoppingCart />
                  Buy Now
                </button>
              </div>

              {/* Secure payment */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-base-content/50">
                <FaCheckCircle className="text-success" />
                Secure checkout • Instant access
              </div>
            </div>
          </div>
        </div>

        {/* ================= BUYER FEEDBACK ================= */}

        <div className="mt-20 border-t border-base-300 pt-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Reader Feedback
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-base-content sm:text-4xl">
              What buyers are saying
            </h2>

            <p className="mt-3 text-base text-base-content/60">
              Real feedback from readers who purchased this book.
            </p>
          </div>

          {/* Reviews */}
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* ================= COUPON MODAL ================= */}

      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-base-100 p-6 shadow-2xl sm:p-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FaTag />
                </div>

                <h3 className="text-2xl font-bold text-base-content">
                  Apply Coupon
                </h3>

                <p className="mt-1 text-sm text-base-content/50">
                  Enter your coupon code to get a discount.
                </p>
              </div>

              <button
                onClick={() => setShowCouponModal(false)}
                className="btn btn-circle btn-sm btn-ghost"
              >
                <FaTimes />
              </button>
            </div>

            {/* Coupon Input */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold">
                Coupon Code
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setCouponError("");
                  }}
                  placeholder="e.g. BOOK20"
                  className="input input-bordered h-12 flex-1 bg-base-200 focus:border-primary focus:outline-none"
                />

                <button
                  onClick={handleApplyCoupon}
                  className="btn btn-primary h-12 text-white"
                >
                  Apply
                </button>
              </div>

              {/* Error */}
              {couponError && (
                <p className="mt-2 text-sm text-error">{couponError}</p>
              )}

              {/* Success */}
              {couponApplied && (
                <div className="mt-3 rounded-xl bg-success/10 p-3 text-sm font-medium text-success">
                  ✓ Coupon applied successfully! You saved ৳{discountAmount}.
                </div>
              )}
            </div>

            {/* Demo Coupon */}
            <div className="mt-5 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4">
              <p className="text-xs text-base-content/50">Demo coupon</p>

              <p className="mt-1 font-bold tracking-wider text-primary">
                BOOK20
              </p>

              <p className="mt-1 text-xs text-base-content/50">
                Get 20% off this book
              </p>
            </div>

            {/* Modal Buttons */}
            <div className="mt-6 grid gap-3">
              <button
                onClick={() => {
                  setShowCouponModal(false);
                  handleBuyNow();
                }}
                className="btn btn-primary h-12 text-white"
              >
                <FaShoppingCart />
                Buy Now
              </button>

              <button
                onClick={() => setShowCouponModal(false)}
                className="btn btn-ghost h-12"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* =====================================================
   INFO ITEM
===================================================== */

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="rounded-xl border border-base-300 bg-base-200 p-4">
      <div className="text-primary">{icon}</div>

      <p className="mt-3 text-xs text-base-content/50">{label}</p>

      <p className="mt-1 text-sm font-bold text-base-content">{value}</p>
    </div>
  );
};

/* =====================================================
   REVIEW CARD
===================================================== */

const ReviewCard = ({ review }) => {
  return (
    <div className="group rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* User */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FaUser />
        </div>

        <div>
          <h3 className="font-bold text-base-content">{review.name}</h3>

          <p className="text-xs text-base-content/50">{review.date}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-1 text-warning">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={star <= review.rating ? "opacity-100" : "opacity-20"}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="mt-4 text-sm leading-7 text-base-content/65">
        "{review.comment}"
      </p>
    </div>
  );
};

export default BookDetails;
