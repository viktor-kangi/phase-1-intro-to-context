// Your code here
function createEmployeeRecord(obj) {
    const filledArray = {
        firstName: obj[0],
        familyName: obj[1],
        title: obj[2],
        payPerHour: obj[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return filledArray
}

function createEmployeeRecords(array){
    return array.map((obj) => createEmployeeRecord(obj))
}

function createTimeInEvent(employee, timeStamp){
    const [date, hour] = timeStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: Number(hour),
        date,
    })
    return employee
}

function createTimeOutEvent(employee, timeStamp){
    const [date, hour] = timeStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(hour),
        date,
    })
    return employee
}

function hoursWorkedOnDate(employee, timeStamp) {
    const timeIn = employee.timeInEvents.find(event => event.date === timeStamp)
    const timeOut = employee.timeOutEvents.find(event => event.date === timeStamp)
     return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, hours) {
    const wages = hoursWorkedOnDate(employee, hours)
        * employee.payPerHour
    return Number(wages)
}

function allWagesFor(employee) {
    const createCopy = employee.timeInEvents.map(event => event.date)
    const allWages = createCopy.reduce((record,dates) => record + wagesEarnedOnDate(employee, dates), 0)

    return allWages
}

function calculatePayroll(recordsArray){
    return recordsArray.reduce((employee, record) => employee + allWagesFor(record), 0)

}