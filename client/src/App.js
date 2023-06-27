
import './App.css';
import React,{useReducer} from 'react';
import Footer from './components/footer';
import Header from './components/header';
import History from './components/history';
import { GlobalContext,initialState } from './contextapi';
import reducer from './reducer';
function App() {
  const [currentState,d]=useReducer(reducer,initialState);

  return (
    
    <div className="App">
      <GlobalContext.Provider value={{currentState,d}}>
        <Header/>
        <Footer/>
        <History/>
      </GlobalContext.Provider>    
    </div>

  );
}

export default App;
export {GlobalContext}