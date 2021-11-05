import { useEffect, useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {retrieveWeekDays} from '../../utils/utils';
import {getDaysBlocked} from '../../api/connect_api';

function Calendario(props) {

   const [today] = useState(new Date());
   const [daysBlocked, setDaysBlocked] = useState(null);
   const [disabledDays, setDisabledDays] = useState([{ before: today }]);
   const [selectedDay, setSelectedDay] = useState(null);
   const weekDaysDefault = [1, 2, 4, 8, 16, 32, 64];
   const dictWeekDays = {
      1: 0,
      2: 1,
      4: 2,
      8: 3,
      16: 4,
      32: 5,
      64: 6,
   };

   const WEEKDAYS_SHORT = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
   const MONTHS = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
   ];

   useEffect(()=>{
      organizeWeekDaysToDisable();
   }, []);

   async function fetchDayBlocked() {
      const daysBlockedTemp = await getDaysBlocked(props.idExp);
      console.log('daysBlockedTemp', daysBlockedTemp);
      if(daysBlockedTemp.status === 200)
      {
         const dataDaysBlocked = daysBlockedTemp.data;

         for (let i = 0; i < dataDaysBlocked.length; i++) {
            const element = dataDaysBlocked[i];
            const dtStart = new Date(element.dtStart);
            const dtEndTemp = new Date(element.dtEnd);
            const dtEndFinal = new Date(dtEndTemp.setDate(dtEndTemp.getDate() + 1));

            const objToBlockDays = {
               after: dtStart,
               before: dtEndFinal
            }
            
            setDisabledDays((prevState) => {
               const newState = [...prevState];
               newState.push(objToBlockDays);
               return newState;
            });
         }
      }
   }

   function organizeWeekDaysToDisable() {
      const weekdays = retrieveWeekDays(props.weekDays);
      console.log('weekdays', weekdays);
   
      const diffWeekDays = weekDaysDefault.filter(e => weekdays.indexOf(e) === -1);
      const arrWeeksToDisable = [];
      for (let i = 0; i < diffWeekDays.length; i++) {
         const element = diffWeekDays[i];
         arrWeeksToDisable.push(dictWeekDays[element]);
      }

      // console.log('arrWeeksToDisable', arrWeeksToDisable);
      setDisabledDays((prevState) => {
         const newState = [...prevState];
         newState.push({daysOfWeek: arrWeeksToDisable});
         return newState;
      });
      fetchDayBlocked();
   }

   function handleDayClick(day, modifiers={}) {
      if (modifiers.disabled) {
         return;
      }

      const dayTemp = modifiers.selected ? undefined : day;
      setSelectedDay(dayTemp);
      props.onSetSelectedDay(dayTemp);
      console.log('selectedDay', selectedDay);
   }

   return (
      <DayPicker
         locale="pt"
         selectedDays={selectedDay}
         onDayClick={(e, m) => handleDayClick(e, m)}
         weekdaysShort={WEEKDAYS_SHORT}
         months={MONTHS}
         disabledDays={disabledDays}
         // disabledDays={[new Date(2021, 2, 30), { daysOfWeek: [0, 6] }]}
      />
   );
}

export default Calendario;