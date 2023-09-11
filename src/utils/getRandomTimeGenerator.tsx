function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export const generateRandomTime = () => {
    const hours = getRandomInt(1, 12); 

    const minutes = getRandomInt(0, 11) * 5; 

    const period = Math.random() < 0.5 ? 'am' : 'pm'; 

    const durationMinutes = getRandomInt(1, 4 * 60 / 5) * 5;

    const startHour = hours;
    const startMinutes = minutes;
    const endMinutes = startMinutes + durationMinutes;
    const endHour = startHour + Math.floor(endMinutes / 60);

    const formattedStartTime = `${startHour}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    const formattedEndTime = `${endHour}:${endMinutes % 60 < 10 ? '0' : ''}${endMinutes % 60} ${endHour >= 12 ? 'pm' : 'am'}`;

    return {
        startTime: formattedStartTime,
        endTime: formattedEndTime,
    };
}


