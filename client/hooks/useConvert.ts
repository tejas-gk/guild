import {useState} from 'react';
export default function useConvert() {
  let date:Date = new Date();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let seconds = date.getSeconds();
  let time = `${hours}:${minutes}:${seconds}`;

  const convertTo12Hour = (time:string) => {
    let hours:any = time.split(':')[0];
    let minutes = time.split(':')[1];
    let seconds = time.split(':')[2];
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;

    hours = hours ? hours : 12;
    minutes = minutes.length === 1 ? '0' + minutes : minutes;
    seconds = seconds.length === 1 ? '0' + seconds : seconds;
    let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
  }

  const convertToHumanReadable = (time:string) => {
    let timeToString=time.toString();
    let hours:any = timeToString.split(':')[0];
    let minutes:any = timeToString.split(':')[1];
    let seconds:any = timeToString.split(':')[2];
    let oneDay = 24 * 60 * 60 * 1000;
    let firstDate = new Date(0, 0, 0, hours, minutes, seconds);
    let secondDate = new Date(0, 0, 0, 0, 0, 0);
    let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    let diffHours = Math.abs(firstDate.getHours() - secondDate.getHours());
    let diffMinutes = Math.abs(firstDate.getMinutes() - secondDate.getMinutes());
    let diffSeconds = Math.abs(firstDate.getSeconds() - secondDate.getSeconds());
    let timeToNumber=parseInt(timeToString.split(':')[0]);
    
    let strTime = `${diffHours} hours ${diffMinutes} minutes ${diffSeconds} seconds`;
    return strTime;
  }


  return {
    convertTo12Hour,
    convertToHumanReadable
    
  }
}

