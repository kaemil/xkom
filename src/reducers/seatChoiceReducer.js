const setDataReducer = (state = [], action) => {
     switch (action.type) {
          case 'SEAT_CHOICE':
               return [...state.slice(0,action.payload).concat(state.slice(action.payload+1))]
          case 'SEAT_UNCHOICE':
               return [ ...state,action.payload]     
          default:
               return state
     }
}

export default setDataReducer
