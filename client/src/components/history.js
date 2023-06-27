import React, { useContext, useEffect,useState } from 'react';
import { GlobalContext } from '../contextapi';
import '../App.css';

const History = () => {
  const { currentState,d } = useContext(GlobalContext);

  const [isFormVisible, setFormVisible] = useState(false);
  const [text,setText]=useState('');
  const [amount,setAmount]=useState(0);
  const [edit_id,setId]=useState('');

  const solve=(val)=>{
    openForm();
    setId(val.toString());
  }

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = async () => {
    await fetchData();
    setFormVisible(false);
   
  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data={amount:parseInt(amount),description:text};
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
  const response=await fetch('http://localhost:5000/api/transaction/update/'+edit_id, requestOptions);
  const res_val= await response.json();
  d({
    type:"UPDATE_TRANSACTION",
    payload:res_val.data
    
  });
  setText("")
  setAmount(0);
  
}
  
  const fetchData=async()=>{
    try{
      const response = await fetch('http://localhost:5000/api/transaction');
      const val= await response.json();
      d({
        type:"getTransaction",
        payload:val.data
      })
      
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
  fetchData();
  }, []);

  function isJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }
  
 
  

  const deleteRecord=async (data)=>{
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
  };
  const val=await fetch('http://localhost:5000/api/transaction/delete/'+data, requestOptions)
    const response = await fetch('http://localhost:5000/api/transaction');
    const res_val= await response.json();
  d({
    type:"DELETE_TRANSACTION",
    payload:res_val.data
  })
  }

  return (
    <div className='table-container'>
      <table>
      <thead>
        <tr>
          <th>date</th>
          <th>details</th>
          <th>amount</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
      {currentState.map((item,index) => {
        item=JSON.stringify(item);
        item=JSON.parse(item);
        return (
          
            <tr key={index}>
            <td className='history-item-description'>{item.time}</td>
              <td className='history-item-description'>{item.description}</td>
              <td className='history-item-amount'>{item.amount}</td>
              <td> <button className="delete-btn" onClick={()=>{deleteRecord(item._id)}}> delete </button>
              <button className="update-btn" onClick={()=>{solve(item._id)}} >update</button></td>
              
            </tr>
    
        );
      })}
      </tbody>
      </table>
      {isFormVisible && (
        <div className="popupFormContainer">
          <form className="popupForm" onSubmit={handleSubmit}>
            {/* Your form fields go here */}
            
            <input className='edit_data' placeholder="description" type="text" name="amount" id="amount" value={text} onChange={(e)=>{setText(e.target.value)}}/>
            <input className='edit_data' placeholder="amount" type="number" name="amount" id="amount" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
            <button className="edit_button" type="submit">Submit</button>
            <button className='edit_close_button' onClick={closeForm}>Done</button>
          </form>
        </div>
      )}
    </div>


  );
};

export default History;
