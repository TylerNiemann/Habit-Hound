export const getCurrentWeek = (): string[] => {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); 
    const diff = currentDayOfWeek === 0 ? 0 : -currentDayOfWeek; 
    const firstDayOfWeek = new Date(currentDate); 
    firstDayOfWeek.setDate(currentDate.getDate() + diff); 
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); 
  
    const startOfWeek = firstDayOfWeek.toISOString().slice(0, 10);
    const endOfWeek = lastDayOfWeek.toISOString().slice(0, 10);
  
    return [startOfWeek, endOfWeek];
  };


 export const getCurrentFullWeek = () => {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); 
    const startOfWeek = new Date(currentDate); 
    startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek); 
  
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
  
    return weekDates;
  };

  export const getCurrentMonth = (): string[] => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
    const startOfMonth = firstDayOfMonth.toISOString().slice(0, 10);
    const endOfMonth = lastDayOfMonth.toISOString().slice(0, 10);
  
    return [startOfMonth, endOfMonth];
  };