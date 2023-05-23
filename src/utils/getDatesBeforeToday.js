export const getDatesBeforeToday = (daysBefore) => {
    var today = new Date();
    var datesArray = [];

    for (var i = 0; i < daysBefore; i++) {
        var targetDate = new Date(today);
        targetDate.setDate(today.getDate() - i);
        datesArray.push(targetDate.toISOString().slice(0, 10));
    }

    return datesArray;
};
