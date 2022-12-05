import { intervals } from "../components/Tables/intervals";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date.toString().replace(/-/g, '\/').replace(/T.+/, '')));
}

function formatTime(time: string) {
    return time.substring(0, 5);
}

function convertIntervalTime(intervalNumber: number) {
  return intervals[intervalNumber]
}

function convertIntervalDate(intervalDate: string) {
    const days = [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sabádo',
      'Domingo'
    ];
  
  return days[Number(intervalDate.charAt(intervalDate.length - 1))];
}

export { formatDate, formatTime, convertIntervalTime, convertIntervalDate };
