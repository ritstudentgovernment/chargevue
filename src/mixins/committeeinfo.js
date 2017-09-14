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
    },
    'studentaffairs': {
      'friendlyname': 'Student Affairs'
    },
    'technology': {
      'friendlyname': 'Technology'
    },
    'sustainability': {
      'friendlyname': 'Sustainability'
    },
    'senator': {
      'friendlyname': 'Senator'
    },
    'rso': {
      'friendlyname': 'Representative Student Organization'
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
