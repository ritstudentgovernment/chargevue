const createCsvWriter = require('csv-writer').createObjectCsvWriter
const chargeWriter = createCsvWriter({ path: '../assets/charges.csv', header: [{id: 'name', title: 'NAME'}, {id: 'description', title: 'DESCRIPTION'}, {id: 'timestamp', title: 'CREATED_AT'}, {id: 'assignment', title: 'ASSIGNED_TO'}, {id: 'status', title: 'STATUS'}] })
const minuteWriter = createCsvWriter({ path: '../assets/minutes.csv', header: [{id: 'title', title: 'TITLE'}, {id: 'relatedCharges', title: 'RELATED CHARGES'}, {id: 'name', title: 'COMMITTEE NAME'}, {id: 'timestamp', title: 'CREATED_AT'}] })
const chargeRecords = [
    {name: 'Bob', lang: 'French, English'},
    {name: 'Mary', lang: 'English'}
]
const minuteRecords = [
    {name: 'Bob', lang: 'French, English'},
    {name: 'Mary', lang: 'English'}
]

chargeWriter.writeRecords(chargeRecords)       // returns a promise
    .then(() => { console.log('...Charges Done') })
minuteWriter.writeRecords(minuteRecords)
    .then(() => { console.log('...Minutes Done') })     // returns a promise
    
// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Bob,"French, English"
//   Mary,English

// Minutes - Committee Name, Timestamp of Creation, Title of Minutes, Related Charges List
// [{id: 'title', title: 'TITLE'}, {id: 'relatedCharges', title: 'RELATED CHARGES'},
//  {id: 'name', title: 'COMMITTEE NAME'}, {id: 'timestamp', title: 'CREATED_AT'}]

// Charges - Creation Timestamp, Committee Assigned to, Status (completed, stopped, in progress, etc), Charge Name, Charge Description
// [{id: 'name', title: 'NAME'}, {id: 'description', title: 'DESCRIPTION'},
//  {id: 'timestamp', title: 'CREATED_AT'}, {id: 'assignment', title: 'ASSIGNED_TO'},
//   {id: 'status', title: 'STATUS'}]
