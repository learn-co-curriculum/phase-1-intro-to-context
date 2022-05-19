// Your code here
function createEmployeeRecord(employeeData) {
    const employee = {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employee;
}

function createEmployeeRecords(employeeRecords) {
    const fullEmployeeRecords = [];
    employeeRecords.forEach((record) => {
        fullEmployeeRecords.push(createEmployeeRecord(record));
    });
    return fullEmployeeRecords;
}

function createTimeInEvent(employee, timeIn) {
    const timeInData = splitTimeIn(timeIn);
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(timeInData[1]),
        date: timeInData[0]
    };
    employee.timeInEvents.push(timeInEvent);
    return employee;
}

function splitTimeIn(timeIn) {
    return timeIn.split(" ");
}

function createTimeOutEvent(employee, timeOut) {
    const timeOutData = splitTimeIn(timeOut);
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(timeOutData[1]),
        date: timeOutData[0]
    };
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeInEvent = findEventForDate(employee.timeInEvents, date);
    const timeOutEvent = findEventForDate(employee.timeOutEvents, date);
    const duration = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return duration;
}

function findEventForDate(timeEvents, date) {
    const timeEvent = timeEvents.find(timeEvent => timeEvent.date === date);
    return timeEvent;
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wage = hoursWorked * employee.payPerHour;
    return wage;
}

function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(timeInEvent => timeInEvent.date);
    let allWages = 0;
    dates.forEach(date => {
        allWages = allWages + wagesEarnedOnDate(employee, date);
    });
    return allWages;
}

function calculatePayroll(employees) {
    let allWages = 0;
    employees.forEach(employee => {
        allWages = allWages + allWagesFor(employee);
    });
    return allWages;
}