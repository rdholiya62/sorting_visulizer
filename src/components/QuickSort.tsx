import React, {useEffect, useState} from 'react';
import '../App.css'
import { Link } from 'react-router-dom';

type Element = {
    value: number,
    color: string
}

function QuickSort(){
    const [elements, setElements] = useState<Element[]>([]);
    const [speed, setSpeed] = useState<number>(10);
    const [size, setSize] = useState<number>(10);
    const [array, setArray] = useState<string>('');

    useEffect(() => {
        generateElements(size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generateElements = (n : number) => {
        const newElements: Element[] = [];
        if (n === 0) {
            setElements(newElements);
            return;
        }
        const hue = 360 / n;
        for(let i = 0; i < n; i++){
            newElements.push({
                value: Math.floor(Math.random() * 700),
                color: `hsl(${hue * i}, 50%, 50%)`
            });
        }
        setElements(newElements);
        setArray(newElements.map((element) => element.value).join(','));
    }

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const quickSort = async () => {
        await _quickSort(0, elements.length - 1);
    }

    const _quickSort = async (start: number, end: number) => {
        if(start >= end) return;
        const pivot = await partition(start, end);
        await _quickSort(start, pivot - 1);
        await _quickSort(pivot + 1, end);
    }

    const partition = async (start: number, end: number) => {
        let pivot = start;
        let i = start + 1;
        let j = end;
        while(i <= j){
            if(elements[i].value > elements[pivot].value && elements[j].value < elements[pivot].value){
                await swap(i, j);
            }
            if(elements[i].value <= elements[pivot].value) i++;
            if(elements[j].value >= elements[pivot].value) j--;
        }
        await swap(pivot, j);
        return j;
    }

    const swap = async (i: number, j: number) => {
        const temp = elements[i];
        elements[i] = elements[j];
        elements[j] = temp;
        setElements([...elements]);
        await sleep(100 - speed);
    }
    
        

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === ''){
            setSize(0);
            generateElements(0);
            return;
        }
        // trim the input to remove leading zeros
        e.target.value = e.target.value.replace(/^0+/, '');
        const newSize = parseInt(e.target.value);
        if(newSize > 50) return;
        setSize(newSize);
        generateElements(newSize);
    }

    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(parseInt(e.target.value));
    }

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setArray(e.target.value);

        // Extract all the numbers from the input
        const numbers = e.target.value.split(',').map((num) => parseInt(num));
        const newElements: Element[] = [];
        const hue = 360 / numbers.length;
        for(let i = 0; i < numbers.length; i++){
            newElements.push({
                value: numbers[i],
                color: `hsl(${hue * i}, 50%, 50%)`
            });
        }
        setElements(newElements);
        setSize(numbers.length);
    }

    return(
        <div className='container'>
            <nav>
                <div className="speed">
                    <label htmlFor="speed">Speed</label>
                    <input type="range" name="speed" id="speed" min="1" max="100" value={speed} onChange={handleSpeedChange}/>
                </div>
                <div className="size">
                    <label htmlFor="size">Size</label>
                    <input type="number" name="size" id="size" placeholder='Size of array..' value={size} onChange={handleSizeChange} min="1" max="50"/>
                </div>
                <Link to='/' className='logo'>Quick Sort</Link>
                <div className="array-input">
                    <label htmlFor="array-input">Array</label>
                    <input type="text" name="array" id="array-input" placeholder='Enter comma separated array..' value={array} onChange={handleArrayChange}/> 
                </div>
                <button onClick={() => generateElements(size)} className='generate'>Generate new array</button>
                <button onClick={() => quickSort()} className='sort'>Sort the array</button>
            </nav>
            <div className="array-container">
                {elements.map((element, index) => (
                    <div className="array-bar" key={index} style={{height: `${element.value}px`,
                    backgroundColor: element.color}}><span>{element.value}</span></div>
                ))}
            </div>
        </div>
    )
}

export default QuickSort;