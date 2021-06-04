//Import API ACTION//

export const setData = (seats) => {
     return {
          type: 'SET_DATE',
          payload: seats
     }
}



export const seatsCloseBy = ()=>{
     return{
          type:'SEATS_CLOSE_BY',
     }
}

export const inputedNumberOfSeats = (seats)=>{
     return{
          type:'INPUTED_NUMBER_OF_SEATS',
          payload: seats
     }
}

export const seatNumberToReserve = (seats)=>{
     return{
          type:'SEAT_NUMBER_TO_RESERVE',
          payload: seats
     }
}

//MainCard ACTIONS//





export const seatChoice =(seatID)=>{
     return{
          type:'SEAT_CHOICE',
          payload: seatID
     }
}

export const seatUnChoice =(seatID)=>{
     return{
          type:'SEAT_UNCHOICE',
          payload: seatID
     }
}

//SummaryCard ACTIONS//

export const seatToConfirm=(seatNumber)=>{
     return{
          type:'SEAT_TO_CONFIRM',
          payload: seatNumber
     }
}

export const updatedDataList=(updateSeat)=>{
     return{
          type:'UPDATED_DATA_LIST',
          payload: updateSeat
     }
}

export const updatedReservedSeats=(reservedSeat)=>{
     console.log(reservedSeat)    
     return{
          type:'UPDATED_RESERVED_SEATS',
          payload: reservedSeat
     }
}