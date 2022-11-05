function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

function formatTime(time: string) {
    return time.substring(0, 5);
}

export {formatDate, formatTime}