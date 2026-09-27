import React from 'react';
import Hero from './Hero';
import BookCollection from './BookCollection ';
const bookres = fetch(`https://e-book-server-delta.vercel.app/books?limit=10`)
.then(res => res.json())
const Home = () => {
    return (
        <div>
           <Hero></Hero>
           <BookCollection bookres = {bookres}></BookCollection>
        </div>
    );
};

export default Home;