import React from 'react';
import { useContext , useState} from 'react';
import '../App.css';
import { GlobalContext } from '../App.js';
const Footer = () => {
  const {currentState,d}=useContext(GlobalContext);
  const [text,setText]=useState('');
  const [amount,setAmount]=useState('');
  const submitHandler=async (e)=>{
    e.preventDefault();
    const data={amount:parseInt(amount),description:text};
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try{
      const response = await fetch('http://localhost:5000/api/transaction/add', requestOptions);
      const data = await response.json();
      console.log(data);
      const response1 = await fetch('http://localhost:5000/api/transaction');
      const val= await response1.json();
      d({
        type:'ADD_TRANSACTION',
        payload:val.data
      })
    }
    catch(err){
      console.log(err)
    }
    
    
    setText('');
    setAmount('');
    }
  return(
    <div className='footer'>
    <h3 className='b'> Add new transaction</h3>
      <form onSubmit={submitHandler} >
        <div className='c'>
        <label  htmlFor="text">Enter Text</label>
        </div>
        
        <input className='input_data' placeholder="please enter the description" type="text" name="text" id="text" value={text} onChange={(e)=>{setText(e.target.value)}}/>
      
        <br/>
        <div className='c'>
        <label htmlFor="amount">Enter Amount</label>
        </div>
        <input className='input_data' placeholder="please enter the amount" type="number" name="amount" id="amount" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
        <button className='btn' type="submit"> Add Transaction</button>
    </form>
    </div>
  )
}

export default Footer;
