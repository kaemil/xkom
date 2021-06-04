import {useSelector,useDispatch} from 'react-redux';
import React,{useEffect} from 'react';
import {seatChoice,seatUnChoice,seatToConfirm,updatedDataList,updatedReservedSeats} from '../actions'

function MainCard(){
     const dispatch = useDispatch()
     const setDatas = useSelector(state=> state.setData.seats)
     const seatsChoice = useSelector(state=>state.seatChoice)
     const seatsNumber = useSelector(state=>state.seatNumber)
     //
     //
     const checkSeatsX=[]
     const checkSeatsY=[]
     const seatsGenerate=[]
     const existingSeat=[]
     //
     const choosenSeats=[]
     seatsChoice.forEach(element=>{
          choosenSeats.push(element)
          }
     )
     //Select seats to reserve//

     //Looking for max number of seats in X and Y
     for (let i =0;i<setDatas.length;i++){
          checkSeatsX.push(setDatas[i].cords.x)
          checkSeatsY.push(setDatas[i].cords.y)
          existingSeat.push(setDatas[i].id)
     }
     const maxSeatX = Math.max(...checkSeatsX)
     const maxSeatY = Math.max(...checkSeatsY)

     //Creating list of reserved seats//
     useEffect(() => {
          for (let i =0;i<setDatas.length;i++){
               if(setDatas[i].reserved===true){
                    document.getElementById(setDatas[i].id).style.background ='#474747'
                    document.getElementById(setDatas[i].id).classList.add('reserved')
                    document.querySelectorAll('.reserved').forEach(element=>{
                    element.disabled=true
                    })
               }
          }
          seatsChoice.forEach(element=>{
               document.getElementById(element).classList.add('seatSelected')
          })
     })
     if(seatsChoice.length != 0){
           document.getElementById('reserveSeat').removeAttribute('disabled','')
     }

     //Creating cinema seats layout using buttons//
     for (let x=0;x<=maxSeatX;x++){
          for(let y=0;y<=maxSeatY;y++){
               const seatNumber= 's'+x+y
               if(existingSeat.includes(seatNumber)){
                    seatsGenerate.push(
                         <div className='seatEmpty' key={seatNumber}>
                              <button className='seat' id={seatNumber} onClick={()=>{
                                   if(choosenSeats.includes(seatNumber)){
                                        dispatch(seatChoice(choosenSeats.indexOf(seatNumber)))
                                        document.getElementById(seatNumber).classList.remove('seatSelected')
                                        if(seatsChoice.length-1 == 0){
                                        document.getElementById('reserveSeat').setAttribute('disabled','')
                                        }
                                   }else{
                                        if(seatsChoice.length!=seatsNumber)
                                        dispatch(seatUnChoice(seatNumber))
                                   }                                        
                              }}></button>
                         </div>)
               } else{
                    seatsGenerate.push(<div className='seatEmpty' id={seatNumber} key={seatNumber}></div>)}
          } 
     }
     const showingSeats=[]
     if(seatsNumber!=0){
          showingSeats.push(<span>/{seatsNumber}</span>)
     }

     return(
         
          <div className='mainCard' id='mainCard'>
               <div className='mainCard__container'>
                    {seatsGenerate}
               </div>
               <div className='mainCard__choosedSeatsInfo'>Wybrane miejsca: {seatsChoice.length}{showingSeats}</div>
               <div class="mainCard__legend">
                         <div class="legend__element">
                         <div className='seat'></div>
                         <div className='para'><p>Miejsca dostępne</p></div>
                         </div>
                         <div class="legend__element">
                         <div className='seat' style={{backgroundColor: '#474747'}}></div>
                         <div className='para'><p>Miejsca zarezerwowane</p></div>
                         </div>
                         <div class="legend__element">
                         <div className='seat' style={{backgroundColor: '#ff8a05'}}></div>
                         <div className='para'><p>Twój wybór</p></div>
                         </div>
                         <button className='mainCard__button' id='reserveSeat' onClick={()=>{
                              dispatch(seatToConfirm(choosenSeats))
                              dispatch(updatedDataList(setDatas))
                              dispatch(updatedReservedSeats(choosenSeats))
                              document.getElementById('mainCard').style.display= 'none'
                              document.getElementById('summaryCard').style.display='block'
                              }}>Rezerwuj</button>
               </div>
          </div>

     )
}


export default MainCard