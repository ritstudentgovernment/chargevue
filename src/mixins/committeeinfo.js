var committees = {
  'committees': {
    'academicsandcoop': {
      'friendlyname': 'Academics & Co-op'
    },
    'fpat': {
      'friendlyname': 'Facilities, Parking, and Transportation'
    },
    'globalsg': {
      'friendlyname': 'Global SG'
    },
    'housinganddining': {
      'friendlyname': 'Housing & Dining'
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
