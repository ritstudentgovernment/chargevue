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
      console.log(committees.committees[url])
      return committees.committees[url]
    }
  }
}
