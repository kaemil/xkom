import {
     combineReducers
} from 'redux';
import setDataReducer from './setDataReducer'
import seatNumberToReserveReducer from './seatNumberToReserveReducer'
import inputedNumberOfSeatsReducer from './inputedNumberOfSeatsReducer'
import seatChoiceReducer from './seatChoiceReducer'
import seatsCloseByReducer from './seatsCloseByReducer'
import seatToConfirmReducer from './seatToConfirmReducer'
import updatedDataListReducer from './updatedDataListReducer'

const allReducer = combineReducers({
     setData: setDataReducer,
     seatNumber: seatNumberToReserveReducer,
     seatChoice: seatChoiceReducer,
     inputedNumber:inputedNumberOfSeatsReducer,
     seatsClose:seatsCloseByReducer,
     seatToConfirm: seatToConfirmReducer,
     updatedDataList:updatedDataListReducer
})

export default allReducer;