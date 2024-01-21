// createEmployeeRecord
function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

// createEmployeeRecords
function createEmployeeRecords(employeesArray) {
  return employeesArray.map(createEmployeeRecord);
}

// createTimeInEvent
function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  });
  return employeeRecord;
}

// createTimeOutEvent
function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  });
  return employeeRecord;
}

// hoursWorkedOnDate
function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100; // Assuming hours are always on the hour
}

// wagesEarnedOnDate
function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}

// allWagesFor
function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date), 0);
}

// findEmployeeByFirstName
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

// calculatePayroll
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

// Mock data for testing
const lokiRecord = createEmployeeRecord(["Loki", "Laufeyson", "God of Mischief", 50]);
const natashaRecord = createEmployeeRecord(["Natasha", "Romanoff", "Black Widow", 60]);
const employeeRecords = [lokiRecord, natashaRecord];

// Test 
console.log(createTimeInEvent(lokiRecord, '2022-01-01 08:00:00')); // Adjust dateStamp as needed
console.log(createTimeOutEvent(lokiRecord, '2022-01-01 17:00:00')); 
console.log(hoursWorkedOnDate(lokiRecord, '2022-01-01')); // Adjust date as needed
console.log(wagesEarnedOnDate(lokiRecord, '2022-01-01')); // Adjust date as needed
console.log(allWagesFor(lokiRecord));

console.log(calculatePayroll(employeeRecords)); // Adjust dateStamps as needed
