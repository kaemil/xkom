const initialState = {
     seats: []
}

const updatedDataListReducer =(state=initialState,action)=>{
     switch (action.type) {
          case 'UPDATED_DATA_LIST':
               return {...state,seats:action.payload}
          case 'UPDATED_RESERVED_SEATS':
               return state.seats.map((seat,index)=>{
                    if(seat.id ===action.payload[index]){
                         return{
                              ...seat,
                              reserved: true
                         }
                    }
                    return seat
               })
          default:
               return state
     }
}

export default updatedDataListReducer