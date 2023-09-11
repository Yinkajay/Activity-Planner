export const getDaysInOrder = (numDays: number): { year: number; month: number; day: number; dayOfWeek: string }[] => {
    const currentDate = new Date();
    const daysArray: { year: number; month: number; day: number; dayOfWeek: string }[] = [];
    
    for (let i = 0; i < numDays; i++) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const dayOfWeek = getDayOfWeek(currentDate.getDay());
  
      daysArray.push({ year, month, day, dayOfWeek });
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return daysArray;
  };
  
  const getDayOfWeek = (dayIndex: number): string => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
  };
  