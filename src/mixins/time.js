module.exports = {
  methods: {
    convertFrontendToBackend (ampm, hour, minute, textday) {
      let time = ''
      if (ampm === 'PM') {
        time = parseInt(hour) + 12
        time += '' + minute
      } else {
        time = '' + hour + minute
      }

      let day = 0
      switch (textday) {
        case 'Sunday':
          day = 0
          break
        case 'Monday':
          day = 1
          break
        case 'Tuesday':
          day = 2
          break
        case 'Wednesday':
          day = 3
          break
        case 'Thursday':
          day = 4
          break
        case 'Friday':
          day = 5
          break
        case 'Saturday':
          day = 6
          break
        default:
          day = 0
      }

      return {time, day}
    },
    convertBackendToFrontend (oldDay, oldTime) {
      let day = ''
      switch (oldDay) {
        case 0:
          day = 'Sunday'
          break
        case 1:
          day = 'Monday'
          break
        case 2:
          day = 'Tuesday'
          break
        case 3:
          day = 'Wednesday'
          break
        case 4:
          day = 'Thursday'
          break
        case 5:
          day = 'Friday'
          break
        case 6:
          day = 'Saturday'
          break
        default:
          day = 'Sunday'
      }

      let ampm = ''
      let hour = parseInt(oldTime.substr(0, 2))
      if (hour > 12) {
        hour = hour - 12 + ''
        ampm = 'PM'
      } else {
        hour = hour + ''
        ampm = 'AM'
      }

      let minute = oldTime.substring(2, 5)

      return {ampm, day, hour, minute}
    }
  }
}
