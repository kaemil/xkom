const initialState = {
     seats: []
}

const setDataReducer = (state = initialState, {type,payload}) => {
     switch (type) {
          case 'SET_DATE':
               return {...state,seats:payload}
          default:
               return state
     }
}

export default setDataReducer