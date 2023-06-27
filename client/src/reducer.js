
function reducer(currentState,action){
    switch(action.type){
        case 'getTransaction':
            currentState=action.payload;
            return currentState;
        case 'ADD_TRANSACTION':
            currentState=action.payload;
        return(currentState);
        
        case 'DELETE_TRANSACTION':
            currentState=action.payload;
        return(currentState);
        default:
        return currentState;
    }
}

export default reducer;