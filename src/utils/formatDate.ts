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