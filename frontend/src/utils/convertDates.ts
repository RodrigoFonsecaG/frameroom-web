import { endOfWeek, startOfWeek } from 'date-fns';
import { intervals } from '../components/Tables/intervals';

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }).format(date);
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatTime(time: string) {
  return time.substring(0, 5);
}

function convertIntervalTime(intervalNumber: number) {
  return intervals[intervalNumber];
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

  function getWeek(date) {
    const end = endOfWeek(new Date(date), { weekStartsOn: 1 });
    const start = startOfWeek(new Date(date), { weekStartsOn: 1 });
    return `${formatDate(start)} à ${formatDate(end)}`;
  }

export { formatDate, getWeek, addDays, formatTime, convertIntervalTime, convertIntervalDate };
