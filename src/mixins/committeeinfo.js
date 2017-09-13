var committees = {
  'committees': {
    'academicsandcoop': {
      'systemname': 'academicsandcoop',
      'friendlyname': 'Academics & Co-op'
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
