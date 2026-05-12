const calculateTimeLeft = (endDateStr, endTimeStr) => {
  if (!endDateStr || !endTimeStr) return 30 * 60;
  try {
    const dateParts = endDateStr.trim().split(' ');
    const timeParts = endTimeStr.trim().split(' ');
    
    if (dateParts.length !== 3 || timeParts.length < 2) return 30 * 60;
    
    const [day, month, year] = dateParts;
    const [time, modifier] = timeParts;
    let [hours, minutes] = time.split(':');
    
    hours = parseInt(hours, 10);
    if (isNaN(hours)) return 30 * 60;

    if (hours === 12) {
      hours = modifier === 'AM' ? 0 : 12;
    } else if (modifier === 'PM') {
      hours += 12;
    }
    
    const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const parsedMonth = monthMap[month];
    if (parsedMonth === undefined) return 30 * 60;
    
    const endDateTime = new Date(parseInt(year, 10), parsedMonth, parseInt(day, 10), hours, parseInt(minutes, 10), 0).getTime();
    
    if (isNaN(endDateTime)) return 30 * 60;

    const now = Date.now();
    const diff = Math.floor((endDateTime - now) / 1000);
    return diff > 0 ? diff : 0;
  } catch (e) {
    return 30 * 60;
  }
};

console.log(calculateTimeLeft("12 May 2026", "11:59 PM"));
console.log(calculateTimeLeft("invalid date", "invalid time"));
console.log(calculateTimeLeft("", ""));
