import React, { useContext, useState, useEffect } from 'react';
import '../App.css';
import { GlobalContext } from '../contextapi';

const Header = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const { currentState } = useContext(GlobalContext);

  useEffect(() => {
    let temp_income = 0,
      temp_expense = 0,
      temp = 0;

    for (let i = 0; i < currentState.length; i++) {
      if (currentState[i].amount < 0 && currentState[i].amount !== null) {
        temp+=parseInt(currentState[i].amount);
        temp_expense += parseInt(currentState[i].amount);
      } else if (currentState[i].amount > 0 && currentState[i].amount !== null) {
        temp+=parseInt(currentState[i].amount);
        temp_income += parseInt(currentState[i].amount);
      }
    }
    console.log(temp);
    setIncome(temp_income);
    setExpense(temp_expense);
    setBalance(temp);
  }, [currentState]);

  return (
    <>
      <div className='header'>Personal Finance App</div>
      <div className='inc-exp-container'>
        <div>
        <h4>Balance</h4>
        
        <div className="money plus"> {balance || 0}</div>
        </div>
        
      </div>
      <div className='inc-exp-container'>
        <div> 
        <h4> Income 
          </h4>
          <p className='money plus'>{income || 0}</p>
        </div>
        <div> <h4> Expense </h4> 
        <p className='money minus'>{expense || 0}</p>
        </div>

      </div>
    </>
  );
};

export default Header;


