import React, { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {seatNumberToReserve,inputedNumberOfSeats,seatsCloseBy,seatUnChoice} from '../actions'

function ChooseSeatCard(){
     //Selectors//
     const showCard = useSelector(state => state.showCard)
     const state = useSelector(state => state)
     const inputedNumber= useSelector(state=>state.inputedNumber)
     const seatsChoice = useSelector(state=>state.seatChoice)
     const setDatas = useSelector(state=> state.setData.seats)
     const seatsClose = useSelector(state=>state.seatsClose)

     //Dispatcher//
     const dispatch = useDispatch()

     //Function which in random way propose to USER seats to reserve//
     const SeatPropose=(seats)=>{
          const checkSeatsX=[]
          const checkSeatsY=[]
          const existingSeat=[]

          //Creating 2 arrays with all seats and rows// 
          for (let i =0;i<setDatas.length;i++){
               checkSeatsX.push(setDatas[i].cords.x)
               checkSeatsY.push(setDatas[i].cords.y)
               existingSeat.push(setDatas[i].id)
          }
          //Checking max number of rows and seats in rows//
          const maxSeatX = Math.max(...checkSeatsX)
          const maxSeatY = Math.max(...checkSeatsY)

          var allSeatsPossibilities = []
          var allSeats = []
          var allReserved =[]
          var proposition=[]
          var combinationToCompare=[]
          var seatsCombination =[]
          var reservedCombination=[]      

          var z = seats // z- number of seats to propose inserted by user
          for (let j =0;j<setDatas.length;j++){                  //Creating array with all seats from API// 
               allSeats.push(setDatas[j].id)
          }
          for (let j =0;j<setDatas.length;j++){                  //Creating array with all seats reserved state from API//             
               allReserved.push(setDatas[j].reserved)
          }      
          for (let i = 0;i<=maxSeatX;i++){                       //Creating array with all seats possibilities// 
               for (let j = 0;j<=maxSeatY;j++){                  
                    allSeatsPossibilities.push(`s${i}${j}`)
               }
          } 
          for (let i = 0;i<=maxSeatX;i++){                       //Creating all combinations for seats in rows// 
               for (let j = 0;j<maxSeatY-z+2;j++){
                    let x = allSeatsPossibilities.slice(allSeatsPossibilities.indexOf(`s${i}${j}`),z+allSeatsPossibilities.indexOf(`s${i}${j}`))
                    combinationToCompare.push(x)
               }
          } 
          for(let i = 0;i<allSeats.length-z+1;i++){              //Creating combinations for seats from API// 
               let x = allSeats.slice(i,i+z)
               seatsCombination.push(x)
          }
          for(let i = 0;i<allReserved.length-z+1;i++){           //Creating combinations for reserved seats from API// 
               let x = allReserved.slice(i,i+z)
               reservedCombination.push(x)
          }

          //Creating propositions for USER which are close and not divided by reserved seats or empty space// 

          for (let i = 0;i<=combinationToCompare.length;i++){    
               for (let j = 0;j<seatsCombination.length;j++){
                    let seatCheck = JSON.stringify(combinationToCompare[i])===JSON.stringify(seatsCombination[j])   
                    let reserveCheck = reservedCombination[j].includes(true)
                    if(reserveCheck){
                    }else{
                    if(seatCheck===true){
                         proposition.push(combinationToCompare[i])
                         }
                    }
               }
          }    
          //Random choice of seats to propose from available propositions//
          var randomProposition = Math.floor(Math.random()*proposition.length)
          return proposition[randomProposition]
     }

     //Getting avaiable number of seats to reserve//
     const remainingSeats=[]
     for(let i=0;i<state.setData.seats.length;i++){
          if(state.setData.seats[i].reserved === false){
               remainingSeats.push((state.setData.seats[i].reserved).toString())}
          }
     const remainingSeatsNumber = remainingSeats.length
     useEffect(()=>{
          if(document.getElementById('seatsNumber').value==='')
          document.getElementById('selectSeats').setAttribute('disabled','')
     })
     
     //Verify proper data for input (only number can pass forward and between 0-avaiable number of seats)//
     const handleChange=(e)=>{
          document.getElementById('selectSeats').removeAttribute('disabled','')
          const digits_verify = string => [...string].every(c => '0123456789'.includes(c));
          if(digits_verify(e.target.value) ){
               document.getElementById('warning').textContent=''
               if(e.target.value>0 && e.target.value<=remainingSeatsNumber){
                    document.getElementById('selectSeats').removeAttribute('disabled','')
                    dispatch(inputedNumberOfSeats(e.target.value))
               } else{
                    document.getElementById('warning').textContent=`Liczba dostępnych miejsc: ${remainingSeatsNumber}`
                    document.getElementById('selectSeats').setAttribute('disabled','')
               }
          } else {
               document.getElementById('warning').textContent=`Podaj liczbę. Dostępne miejsca: ${remainingSeatsNumber}`
               document.getElementById('selectSeats').setAttribute('disabled','')
          }
     }

     //Dispatching hiding card action and number of seats to reserve//
     const buttonHandle=()=>{
          dispatch(seatNumberToReserve(inputedNumber))
          var seatsProposition=[]

          //Veryfing if used choose option to suggest seats to reserve//
          if(seatsClose){  
          seatsProposition = SeatPropose(parseInt(inputedNumber))
          if(seatsProposition !== undefined){
               seatsProposition.forEach(element=>{
                    dispatch(seatUnChoice(element))
               })
          }}

          //Making button disable or not disable//
          console.log(seatsChoice.length)
          if(seatsChoice.length == 0){
               document.getElementById('reserveSeat').setAttribute('disabled','')
          }

          //Showing card with seats to choose//
          document.getElementById('mainCard').style.display= 'block'
          document.getElementById('chooseSeat').style.display='none'
     }
     return(
          <div className='chooseSeatCard' style={showCard} id='chooseSeat'>
               <div className='chooseSeatCard__input'>
                    <div>
                         <label htmlFor='seatsNumber' >Liczba miejsc: </label>
                    </div>
                    <input type='text' id='seatsNumber' onChange={handleChange} ></input>
               </div>
               <div className='chooseSeatCard__warning' id='warning'></div>
               <div className='chooseSeatCard__checkbox'>
                    <input type='checkbox' id='seatsTogether' onChange={()=>{dispatch(seatsCloseBy())}}></input>
                    <label htmlFor='seatsTogether'>Czy miejsca mają być obok siebie?</label>
               </div>
               <button className='chooseSeatCard__button' onClick={buttonHandle} id='selectSeats'>Wybierz miejsca</button>
          </div>
     )
     
}

export default ChooseSeatCard