const createCsvWriter = require('csv-writer').createObjectCsvWriter
const chargeWriter = createCsvWriter({ path: '../assets/charges.csv', header: [{id: 'name', title: 'NAME'}, {id: 'description', title: 'DESCRIPTION'}, {id: 'timestamp', title: 'CREATED_AT'}, {id: 'assignment', title: 'ASSIGNED_TO'}, {id: 'status', title: 'STATUS'}] })
const minuteWriter = createCsvWriter({ path: '../assets/minutes.csv', header: [{id: 'title', title: 'TITLE'}, {id: 'relatedCharges', title: 'RELATED CHARGES'}, {id: 'name', title: 'COMMITTEE NAME'}, {id: 'timestamp', title: 'CREATED_AT'}] })
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier
const chargeStringifier = createCsvStringifier({ header: [{id: 'name', title: 'NAME'}, {id: 'description', title: 'DESCRIPTION'}, {id: 'timestamp', title: 'CREATED_AT'}, {id: 'assignment', title: 'ASSIGNED_TO'}, {id: 'status', title: 'STATUS'}] })
const minuteStringifier = createCsvStringifier({ header: [{id: 'title', title: 'TITLE'}, {id: 'relatedCharges', title: 'RELATED CHARGES'}, {id: 'name', title: 'COMMITTEE NAME'}, {id: 'timestamp', title: 'CREATED_AT'}] })

let charges = [
    {title: 'test'}
]
let minutes = [
    {title: 'test'}
]
const gatherChargeRecords = (charges) => {
  let obj = []
  for (let charge of charges) {
    obj.push({name: charge.title, description: charge.description, timestamp: charge.created_at, assignment: charge.committee, status: charge.status})
  }
//   chargeStringifier.stringifyRecords(obj)
  chargeWriter.writeRecords(obj)       // returns a promise
    .then(() => { console.log('...Charges Done') })
}

const gatherMinutesRecords = (minutes) => {
  let obj = []
  for (let minute of minutes) {
    obj.push({title: minute.title, relatedCharges: minute.charges, name: minute.committee_id, timestamp: minute.date})
  }
//   minuteStringifier.stringifyRecords(obj)
  minuteWriter.writeRecords(obj)       // returns a promise
    .then(() => { console.log('...Minutes Done') })
}

const gatherAndWrite = (charges = {message: 'empty'}, minutes = {message: 'empty'}) => {
  let obj = {}
  obj.chargeHeaders = chargeStringifier.getHeaderString()
  obj.chargeRecords = gatherChargeRecords(charges)
  obj.minuteHeader = minuteStringifier.getHeaderString()
  obj.minutesRecords = gatherMinutesRecords(minutes)
  console.log(obj)
  return obj
}

gatherAndWrite(charges, minutes)
// gatherAndWrite(charges, minutes)

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
