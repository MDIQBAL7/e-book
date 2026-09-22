import React from "react";
import BookCollection from "../Home/BookCollection ";

const bookres = fetch(`http://localhost:3000/books`).then((res) =>
  res.json(),
);
const AllBooks = () => {
  return (
    <div>
      <BookCollection bookres = {bookres}></BookCollection>
    </div>
  );
};

export default AllBooks;
