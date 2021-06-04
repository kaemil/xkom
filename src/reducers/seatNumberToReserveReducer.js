const seatNumberToReserveReducer = (state = null,action)=>{
     switch (action.type){
          case 'SEAT_NUMBER_TO_RESERVE':
               return action.payload
          default:
               return state
     }
}

export default seatNumberToReserveReducer