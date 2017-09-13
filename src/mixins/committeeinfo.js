var committees = {
  'committees': {
    'academicsandcoop': {
      'friendlyname': 'Academics & Co-op'
    },
    'fpat': {
      'friendlyname': 'Facilities, Parking, and Transportation'
    }
  }
}

module.exports = {
  methods: {
    getCommitteeInfo (url) {
      return committees.committees[url]
    }
  }
}
