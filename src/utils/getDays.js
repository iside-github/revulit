export const getDays = (startTime, endTime) => {
    var startDate = new Date(startTime);
    var endDate = new Date(endTime);

    var days = [];
    var currentDate = startDate;
    while (currentDate.getTime() <= endDate.getTime()) {
        days.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
};
