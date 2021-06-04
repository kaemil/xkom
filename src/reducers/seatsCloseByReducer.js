const seatsCloseByReducer = (state = false,action)=>{
     switch (action.type){
          case 'SEATS_CLOSE_BY':
               return !state
          default:
               return state
     }
}

export default seatsCloseByReducer