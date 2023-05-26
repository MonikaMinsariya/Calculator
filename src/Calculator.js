import React, { useState } from 'react';

export default function Calculator() {
    //const [inputData, setInputData] = useState('');
    const ops = ['+', '-', '*', '%', '/', '='];
    const [current, setCurrent] = useState('');
    const [previous, setPrevious] = useState('');
    const [operation, setOperation] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const [isValue, setIsValue] = useState(false);


    const [historyHideShow, setHistoryHideShow] = useState(false);
    const handleClick = (e) => {
        if (
            (ops.includes(e.target.value) && ops.includes(result.slice(-1))) ||
            ((e.target.value === '0') && current === '') ||
            ((e.target.value === '00') && current === '') ||
            (ops.includes(e.target.value) && result === '') ||
            ((e.target.value === '.') && result.includes('.')) ||
            (current === 'error') ||
            //(current !=='' && previous==='' && operation==='') 
            (isValue)
        ) {
            return;
        }
        setCurrent(current + e.target.value);
        setResult(result + e.target.value);


    }

    const handleOps = (e) => {
        if (current === "") return;
        if (previous !== '') {
            setPrevious(compute());
        } else {
            setPrevious(current);
        }
        setCurrent('');
        setOperation(e.target.value)
        setResult(result + e.target.value);
        //setResult(previous + operation + current)
        setIsValue(false);

    }

    const compute = () => {
        let ans;
        let A = parseFloat(previous);
        let B = parseFloat(current);
        switch (operation) {
            case '+': ans = A + B; break;
            case '-': ans = A - B; break;
            case '*': ans = A * B; break;
            case '/': ans = A / B; break;
            case '%': ans = ((A * B) / 100); break;
            default: return;
        }
        return ans;
    }
    const handleResult = (e) => {
        //   setCurrent(eval(current).toString());
        try {
            if (current === '' || previous === '') return;
            let value = compute();
            if (value === undefined || value == null) return;
            setResult(result + e.target.value + value);
            setCurrent(value);
            setIsValue(true);
            setPrevious(''); setOperation('');
            //setResult(previous + operation + current)
            setHistory((preval) => { return [...preval, result, value]; });
        }
        catch (e) {
            setCurrent('ERROR');
        }
    }
    const handleClr = () => {
        setCurrent('');
        setOperation('');
        setPrevious('');
        setResult('');
        setIsValue(false);

    }
    const handleDel = () => {
        //console.log(result.slice(-1));
        //if (previous==='' && operation==='') return;

        //if (ops.includes(result.slice(-1))) return setOperation('');
        if (isValue) return;
        setCurrent(String(current).slice(0, -1));
        setResult(String(result).slice(0, -1));
    }

    const showHistory = () => {
        setHistoryHideShow(!historyHideShow);


    }
    const clearHistory = () => {
        setHistory([]);
    }
    return (
        <>
            <h1 className='m-4'>Calculator</h1>
            <div className="d-flex justify-content-center">
                <div className='card text-center text-white mt-2 p-1' style={{ border: '3px solid #61dafb', width: '30rem', backgroundColor: '#282c34' }}>
                    <div className='mb-2 p-2'>
                        {previous}{operation}
                        <br />
                        <input type='text' name='input' required value={current} onChange={() => { }}></input> <button type='button' className='bg-dark text-white' onClick={showHistory}><i className="fa fa-history" aria-hidden="true"></i></button>
                        <br />
                    </div>
                    <div className='mb-3'>
                        <button type='button' className='btn btn-dark' name="btn7" onClick={handleClick} value='7' >7</button>
                        <button type='button' className='btn btn-dark' name="btn8" onClick={handleClick} value='8'>8</button>
                        <button type='button' className='btn btn-dark' name="btn9" onClick={handleClick} value='9'>9</button>
                        <button type='button' className='btn btn-dark' name="ops" onClick={handleOps} value='/'>/</button>
                        <button type='button' className='btn btn-danger' name="btn" onClick={handleDel} value='Del'>Del</button>
                        <br></br>
                        <button type='button' className='btn btn-dark' name="btn4" onClick={handleClick} value='4'>4</button>
                        <button type='button' className='btn btn-dark' name="btn5" onClick={handleClick} value='5'>5</button>
                        <button type='button' className='btn btn-dark' name="btn6" onClick={handleClick} value='6'>6</button>
                        <button type='button' className='btn btn-dark' name="ops" onClick={handleOps} value='*'>*</button>
                        <button type='button' className='btn btn-dark' name="ops" onClick={handleOps} value='%'>%</button>
                        <br />
                        <button type='button' className='btn btn-dark' name="btn1" onClick={handleClick} value='1'>1</button>
                        <button type='button' className='btn btn-dark' name="btn2" onClick={handleClick} value='2'>2</button>
                        <button type='button' className='btn btn-dark' name="btn3" onClick={handleClick} value='3'>3</button>
                        <button type='button' className='btn btn-dark' name="ops" onClick={handleOps} value='+'>+</button>
                        <button type='button' className='btn btn-dark' name="ops" onClick={handleOps} value='-'>-</button>

                        <br />
                        <button type='button' className='btn btn-dark' name="btn0" onClick={handleClick} value='0'>0</button>
                        <button type='button' className='btn btn-dark' name="btn00" onClick={handleClick} value='00'>00</button>
                        <button type='button' className='btn btn-dark' name="btn" onClick={handleClick} value='.'>.</button>
                        <button type='button' className='btn btn-danger' name="btn" onClick={handleClr} value='='>AC</button>
                        <button type='button' className='btn btn-success' name="btn" onClick={handleResult} value='='>=</button>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                {historyHideShow &&
                    <div className='history mt-4' style={{ border: '3px solid #61dafb', width: '24rem', backgroundColor: '#282c34' }}>
                        <h6>History list</h6>

                        <ul className='list-unstyled'>
                            {
                                history.map((item, index) => {
                                    return (
                                        <li key={index}> {item} </li>
                                    )
                                })
                            }
                        </ul>

                        <button type='button' onClick={clearHistory} className='btn btn-dark bg-danger'>
                            <i className="fa fa-trash-o" style={{ fontSize: '20px' }}></i>
                        </button>
                    </div>
                }


            </div>
        </>
    )
}
