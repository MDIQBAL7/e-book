import React from 'react';
import Fuse from "fuse.js";
import {
  FaBookOpen,
  FaFire,
  FaStar,
  FaSortAmountDown,
  FaSearch,
} from "react-icons/fa";
import { NavLink } from 'react-router';
const BookCard = ({book}) => {
    return (
        <div className="group bg-base-200 border border-base-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-72 overflow-hidden bg-base-300">
        <img
          src={book.imageUrl}
          alt={book.bookName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Bestseller */}
        {book.totalSold >= 10000 && (
          <div className="absolute top-3 left-3">
            <span className="badge badge-secondary gap-1 px-3 py-3">
              <FaFire />
              Bestseller
            </span>
          </div>
        )}

        {/* Price */}
        <div className="absolute top-3 right-3">
          <span className="bg-base-100 text-primary font-bold px-3 py-2 rounded-full shadow-md">
            ${book.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {book.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-base-content line-clamp-2 min-h-14">
          {book.bookName}
        </h3>

        <p className="text-sm text-base-content/60 mt-1">
          by {book.writerName}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center gap-1 text-secondary">
            <FaStar />
            <span className="font-semibold text-base-content">
             5
            </span>
          </div>

          <span className="text-base-content/40">•</span>

          <span className="text-sm text-base-content/60">
            {book.pages} pages
          </span>
        </div>

        {/* Sold */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-300">
          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <FaBookOpen className="text-primary" />
            <span>{book?.totalSold?.toLocaleString()} sold</span>
          </div>

          <NavLink to={`/bookDetails/${book?._id}`} className="btn btn-primary btn-sm rounded-full px-5">
            Read
          </NavLink>
          
        </div>
      </div>
    </div>
    );
};

export default BookCard;