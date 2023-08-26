import React from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import BubbleSort from './components/BubbleSort';
import InsertionSort from './components/InsertionSort';
import SelectionSort from './components/SelectionSort';
import MergeSort from './components/MergeSort';
import QuickSort from './components/QuickSort';

function App() {
  return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/bubblesort" element={<BubbleSort/>} />
        <Route path="/insertionsort" element={<InsertionSort/>} />
        <Route path="/selectionsort" element={<SelectionSort/>} />
        <Route path="/mergesort" element={<MergeSort/>} />
        <Route path="/quicksort" element={<QuickSort/>} />
      </Routes>
    </div>
  )
}

export default App;
