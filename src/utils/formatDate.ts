export const formatDate = (date: Date): string => {
    const daySuffixes: string[] = ['st', 'nd', 'rd'];

    const day: number = date.getDate();
    const month: string = date.toLocaleString('default', { month: 'long' });
    const year: number = date.getFullYear();

    let daySuffix: string;
    if (day >= 11 && day <= 13) {
        daySuffix = 'th';
    } else {
        daySuffix = daySuffixes[day % 10 - 1] || 'th';
    }

    return `${day}${daySuffix} ${month}, ${year}`;
}


export const formatDateWithoutDay = (dateObject): string => {
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const { year, month } = dateObject;
    const formattedDate = `${months[month - 1]}, ${year}`;
    return formattedDate;
}

export const formatCalendarDate = (date: { year: number; month: number; day: number }): string => {
    const currentDate = new Date();
    const inputDate = new Date(date.year, date.month - 1, date.day); // Note: Months are 0-based in JavaScript Date objects
  
    if (
      currentDate.getFullYear() === inputDate.getFullYear() &&
      currentDate.getMonth() === inputDate.getMonth() &&
      currentDate.getDate() === inputDate.getDate()
    ) {
      return 'Todayyyyyy';
    }
  
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  
    if (
      tomorrowDate.getFullYear() === inputDate.getFullYear() &&
      tomorrowDate.getMonth() === inputDate.getMonth() &&
      tomorrowDate.getDate() === inputDate.getDate()
    ) {
      return 'Tomorrow';
    }
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return inputDate.toLocaleDateString(undefined, options);
  };
  
  // Example usage:
  