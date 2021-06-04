const seatToConfirmReducer = (state = [], action) => {
     switch (action.type) {
          case 'SEAT_TO_CONFIRM':
               return action.payload  
          default:
               return state
     }
}

export default seatToConfirmReducer