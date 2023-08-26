import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="Home">
            <h1>Sorting Visualiser</h1>
            <Link to="/bubblesort">Bubble Sort</Link>
            <Link to="/insertionsort">Insertion Sort</Link>
            <Link to='/selectionsort'>Selection Sort</Link>
            <Link to='/mergesort'>Merge Sort</Link>
            <Link to='/quicksort'>Quick Sort</Link>
        </div>
    )
}

export default Home;
