var committees = {
  'committees': {
    'academicsandcoop': {
      'friendlyname': 'Academics & Co-op'
    },
    'deafadvocacy': {
      'friendlyname': 'Deaf Advocacy'
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
