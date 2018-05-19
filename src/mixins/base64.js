let functions = {
  methods: {
    convert (file) {
      return new Promise((resolve, reject) => {
        let image = file[file.length - 1]
        let reader = new FileReader()
        reader.readAsDataURL(image)

        reader.onload = function () {
          let imageString = reader.result.split(',')[1]
          resolve(imageString)
        }

        reader.onerror = function (error) {
          reject(error)
        }
      })
    }
  }
}

export default functions
