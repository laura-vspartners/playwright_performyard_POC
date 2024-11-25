// Utility to format a Date object to 'MM/DD/YYYY'
export function formatDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  
  // Utility to get today's date in 'MM/DD/YYYY' format
  export function getTodayDate(): string {
    const today = new Date();
    return formatDate(today);
  }
  
  // Utility to get the date one year from today in 'MM/DD/YYYY' format
  export function getOneYearFromTodayDate(): string {
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    return formatDate(oneYearLater);
  }
  