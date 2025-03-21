export function formatYearMonth(dateString: string): string {
  if (!dateString) return '';
  
  const [year, month] = dateString.split('-');
  
  // Convert month number to month name
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const monthIndex = parseInt(month, 10) - 1;
  const monthName = monthNames[monthIndex];
  
  return `${monthName} ${year}`;
}