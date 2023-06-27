import React,{createContext}from 'react';
const initialState=[];
const GlobalContext=createContext(initialState);
export {GlobalContext,initialState};
