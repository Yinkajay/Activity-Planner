export const formatDate = (date: Date): string => {
    // Define an array of suffixes for day numbers (1st, 2nd, 3rd, etc.)
    const daySuffixes: string[] = ['st', 'nd', 'rd'];

    // Get the day, month, and year from the Date object
    const day: number = date.getDate();
    const month: string = date.toLocaleString('default', { month: 'long' });
    const year: number = date.getFullYear();

    // Determine the day suffix (1st, 2nd, 3rd, etc.)
    let daySuffix: string;
    if (day >= 11 && day <= 13) {
        daySuffix = 'th';
    } else {
        daySuffix = daySuffixes[day % 10 - 1] || 'th';
    }

    // Assemble and return the formatted date string
    return `${day}${daySuffix} ${month}, ${year}`;
}

  // Example usage:
