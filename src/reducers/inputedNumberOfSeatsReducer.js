const inputedNumberOfSeatsReducer = (state = 0,action)=>{
     switch (action.type){
          case 'INPUTED_NUMBER_OF_SEATS':
               return action.payload
          default:
               return state
     }
}

export default inputedNumberOfSeatsReducer