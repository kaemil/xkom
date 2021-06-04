import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios'
import ChooseSeatCard from './components/ChooseSeatCard'
import MainCard from './components/MainCard'
import SummaryCard from './components/SummaryCard'
import {setData} from './actions'
import './index.css'

function App(){
     const dispatch = useDispatch()

     useEffect(()=>{
          const seatsList =  async()=>{
               const seatsData = await axios.get('http://localhost:3000/seats').catch((err)=>{console.log('Err',err)})
               dispatch(setData(seatsData.data))
          }
          
          seatsList()},[])

     return(
          <div>
               <ChooseSeatCard/>
               <MainCard/>
               <SummaryCard/>
          </div>
     )
}
 // add change checked state.

export default App;