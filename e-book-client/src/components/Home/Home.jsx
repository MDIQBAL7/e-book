import React from 'react';
import Hero from './Hero';
import BookCollection from './BookCollection ';
const bookres = fetch(`http://localhost:3000/books?limit=10`)
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