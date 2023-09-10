function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export const generateRandomTime = () => {
    const hours = getRandomInt(1, 12); // Generate random hour from 1 to 12

    // Generate random minutes as multiples of 5
    const minutes = getRandomInt(0, 11) * 5; // Randomly choose 0, 5, 10, ..., 55

    const period = Math.random() < 0.5 ? 'am' : 'pm'; // Randomly choose 'am' or 'pm'

    // Calculate a random duration in minutes (multiples of 5, up to 4 hours)
    const durationMinutes = getRandomInt(1, 4 * 60 / 5) * 5; // Randomly choose 5, 10, 15, ..., 240

    // Calculate the end time based on the start time and duration
    const startHour = hours;
    const startMinutes = minutes;
    const endMinutes = startMinutes + durationMinutes;
    const endHour = startHour + Math.floor(endMinutes / 60);

    // Format start and end times with AM/PM
    const formattedStartTime = `${startHour}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    const formattedEndTime = `${endHour}:${endMinutes % 60 < 10 ? '0' : ''}${endMinutes % 60} ${endHour >= 12 ? 'pm' : 'am'}`;

    return {
        startTime: formattedStartTime,
        endTime: formattedEndTime,
    };
}


