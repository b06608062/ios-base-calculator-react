import React, { useState, useEffect, useRef} from 'react';
import './Calculator.css';
import calculate from '../util/calculate';

const Calculator = () => {
    const [screenValue, setScreenValue] = useState("0");
    const [storeNum, setStoreNum] = useState("0");
    const [OPRStack, setOPRStack] = useState([]);
    const [OPDStack, setOPDStack] = useState([]);
    const [mode, setMode] = useState(0);
    const [OPR, setOPR] = useState("");
    const [error, setError] = useState(false);
    const [reset, setRest] = useState(false);

    const typeNum = (value) => {
        if(screenValue==="0"||mode===1){
            setScreenValue(value);
        }else{
            if(reset){
                setScreenValue(value);
            }else{
                setScreenValue(screenValue + value);
            }
        }
        setMode(0);
        setRest(false);
    }

    const typeDot = () => {
        setRest(false);
       let haveDot = false;
       for(let i=0;i<screenValue.length;i++){
           if(screenValue[i]==="."){
               haveDot = true;
           }
       }
       if(!haveDot){
           setScreenValue(screenValue + ".");
       }
    }

    const backBtn = () => {
        setRest(false);
        setMode(0);
        if(screenValue.length===1){
            setScreenValue("0");
        }else{
            setScreenValue(screenValue.slice(0,screenValue.length-1));
        }
    }

    const addSub = (symbol) =>{
        setRest(false);
        if(mode===0){
            let tmpOPDStack = [...OPDStack];
            if(OPR===""){
                tmpOPDStack.push(parseFloat(screenValue));
            }else{
                OPR==="×"?tmpOPDStack.push(tmpOPDStack.pop()*parseFloat(screenValue)):parseFloat(screenValue)===0?setError(true):tmpOPDStack.push(tmpOPDStack.pop()/parseFloat(screenValue));

            }
            setOPDStack(tmpOPDStack);

            let tmpOPRStack = [...OPRStack];
            tmpOPRStack.push(symbol);
            setOPRStack(tmpOPRStack);

            setMode(1);
            setOPR("");
        }else{
            if(OPR!==""){
                setOPR("");
            }else{
                let tmpOPRStack = [...OPRStack];
                tmpOPRStack[tmpOPRStack.length-1] = symbol;
                setOPRStack(tmpOPRStack);
            }
        }
    }

    const multiDiv = (symbol) => {
        setRest(false);
        if(mode===0){
            let tmpOPDStack = [...OPDStack];
            if(OPR===""){
                tmpOPDStack.push(parseFloat(screenValue));
            }else{
                OPR==="×"?tmpOPDStack.push(tmpOPDStack.pop()*parseFloat(screenValue)):parseFloat(screenValue)===0?setError(true):tmpOPDStack.push(tmpOPDStack.pop()/parseFloat(screenValue));
            }
            setOPDStack(tmpOPDStack);

            setOPR(symbol);
            setMode(1);
        }else{
            setOPR(symbol);
        }
    }

    const equl = () => {
        setRest(true);
        let tmpOPDStack;
        let tmpOPRStack = [...OPRStack];
        if(mode===0){
            if(OPR===""){
                tmpOPDStack = [...OPDStack, parseFloat(screenValue)];
            }else{
                tmpOPDStack = [...OPDStack];
                OPR==="×"?tmpOPDStack.push(tmpOPDStack.pop()*parseFloat(screenValue)):parseFloat(screenValue)===0?setError(true):tmpOPDStack.push(tmpOPDStack.pop()/parseFloat(screenValue));
            }
        }else{
            tmpOPDStack = [...OPDStack];
        }
        const ans = calculate(tmpOPDStack, tmpOPRStack);
        setMode(0);
        setOPR("");
        setScreenValue(ans.toString());
        setOPRStack([]);
        setOPDStack([]);
    }

    const allClear = () => {
        setRest(false);
        setError(false);
        setMode(0);
        setOPR("");
        setScreenValue("0");
        setOPRStack([]);
        setOPDStack([]);
    }

    const memoryStore = () => {
        if(error) return;
        setStoreNum(screenValue);
    }

    const memoryRecell = () => {
        setRest(false);
        setScreenValue(storeNum.toString());
        setMode(0);
    }

    const ln = () => {
        setRest(false);
        if(parseFloat(screenValue)<=0){
            setError(true);
        }else{
            let value =  Math.log(parseFloat(screenValue));
            value = value.toString().slice(0,6);
            setScreenValue(value);
            setOPR("");
            setOPRStack([]);
            setOPDStack([]);   
            setMode(0);         
        }
    }

    const log = () => {
        setRest(false);
        if(parseFloat(screenValue)<=0){
            setError(true);
        }else{
            let value =  Math.log10(parseFloat(screenValue));
            value = value.toString().slice(0,6);
            setScreenValue(value);
            setOPR("");
            setOPRStack([]);
            setOPDStack([]);   
            setMode(0);  
        }
    }

    const sin = () => {
        setRest(false);
        let value =  Math.sin(parseFloat(screenValue));
        value = value.toString().slice(0,6);
        setScreenValue(value);
        setOPR("");
        setOPRStack([]);
        setOPDStack([]);   
        setMode(0);  
    }

    const cos = () => {
        setRest(false);
        let value =  Math.sin(parseFloat(screenValue));
        value = value.toString().slice(0,6);
        setScreenValue(value); 
        setOPR("");
        setOPRStack([]);
        setOPDStack([]);   
        setMode(0);         
    }

    return(
        <div id="container">
      <div className="displayWrapper">
        <input className="display" type="text" value={error?"錯誤":screenValue} disabled/>
      </div>
      <div className="panelWrapper">
        <div className="row">
          <button className="gray" onClick={memoryStore}>MS</button>
          <button className="gray" onClick={memoryRecell}>MR</button>
          <button className="gray" onClick={allClear}>AC</button>
          <button className="gray" onClick={backBtn}>🔙</button>
          <button className="yellow OPR" onClick={(e)=>multiDiv(e.target.innerHTML)}>÷</button>
        </div>
        <div className="row">
          <button className="gray" onClick={log}>log</button>
          <button className="dark" onClick={(e)=>typeNum(e.target.innerHTML)}>7</button>
          <button className="dark" onClick={(e)=>typeNum(e.target.innerHTML)}>8</button>
          <button className="dark" onClick={(e)=>typeNum(e.target.innerHTML)}>9</button>
          <button className="yellow OPR" onClick={(e)=>multiDiv(e.target.innerHTML)}>×</button>
        </div>
        <div className="row">
          <button className="gray" onClick={ln}>ln</button>
          <button className="dark" onClick={(e)=>typeNum(e.target.innerHTML)}>4</button>
          <button className="dark" onClick={(e)=>typeNum(e.target.innerHTML)}>5</button>
          <button className="dark" onClick={(e)=>typeNum(e.target.innerHTML)}>6</button>
          <button className="yellow OPR" onClick={(e)=>addSub(e.target.innerHTML)}>-</button>
        </div>
        <div className="row">
          <button className="gray" onClick={sin}>sin</button>
          <button className="dark" onClick={(e)=>typeNum(e.target.innerHTML)}>1</button>
          <button className="dark" onClick={(e)=>typeNum(e.target.innerHTML)}>2</button>
          <button className="dark" onClick={(e)=>typeNum(e.target.innerHTML)}>3</button>
          <button className="yellow OPR" onClick={(e)=>addSub(e.target.innerHTML)}>+</button>
        </div>
        <div className="row">
          <button className="gray" onClick={cos}>cos</button>
          <button className="dark zero" onClick={(e)=>typeNum(e.target.innerHTML)}>0</button>
          <button className="dark" onClick={typeDot}>.</button>
          <button className="yellow" id="equl" onClick={equl}>=</button>
        </div>
      </div>
    </div>
    );
}

export default Calculator;