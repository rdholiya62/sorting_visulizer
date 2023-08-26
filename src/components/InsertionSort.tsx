import React, {useEffect, useState} from 'react';
import '../App.css'
import { Link } from 'react-router-dom';

type Element = {
    value: number,
    color: string
}

function InsertionSort(){
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

    const insertionSort = async () => {
        for(let i = 1; i < elements.length; i++){
            let j = i - 1;
            const temp = elements[i];
            while(j >= 0 && elements[j].value > temp.value){
                elements[j + 1] = elements[j];
                j--;
                setElements([...elements]);
                await sleep((5000/(speed)));
            }
            elements[j + 1] = temp;
            setElements([...elements]);
            await sleep((5000/(speed)));
        }
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
                <Link to='/' className='logo'>Insertion Sort</Link>
                <div className="array-input">
                    <label htmlFor="array-input">Array</label>
                    <input type="text" name="array" id="array-input" placeholder='Enter comma separated array..' value={array} onChange={handleArrayChange}/> 
                </div>
                <button onClick={() => generateElements(size)} className='generate'>Generate new array</button>
                <button onClick={() => insertionSort()} className='sort'>Sort the array</button>
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

export default InsertionSort;