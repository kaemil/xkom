import React from 'react';
import {useSelector} from 'react-redux';

function SummaryCard(){
     const setDatas = useSelector(state=> state.setData.seats);
     const choosenSeats = useSelector(state=>state.seatToConfirm);
     const confirmedList=[]

     //Creating array of reserved USER seats //
     for(let i=0;i<setDatas.length;i++){
          if(choosenSeats.includes(setDatas[i].id)){
               confirmedList.push(<p key={setDatas[i].id}>- rząd x{setDatas[i].cords.x}, miejsce y{setDatas[i].cords.y} ({setDatas[i].id})</p>);
          }
     }

     return(
          <div className='summaryCard' id='summaryCard'>
               <div>
                    <h3>Twoja rezerwacja przebiegła pomyślnie!</h3>
               </div>
               <div>
                    <ul>Wybrałeś/aś miejsca
                         {confirmedList}
                    </ul>
               </div>
               <div>
               <h5>Dziękujemy. W razie problemów prosimy o kontakt z działem administracji.</h5>
               </div>
          </div>
     )
}

export default SummaryCard