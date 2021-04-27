fs = require('fs')
​
function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
      if (err) {
          return cb && cb(err)
      }
      try {
          const object = JSON.parse(fileData)
          return cb && cb(null, object)
      } catch(err) {
          return cb && cb(err)
      }
  })
}
​
jsonReader('./us-county-boundaries.json', (err, data) => {
  if (err) {
      console.log(err)
      return
  }
  const newData = data.map(county => {
    return {
      name: county.fields.name,
      coord: county.fields.geo_point_2d,
      state: county.fields.state_name
    }
  })
​
  fs.writeFile('./newData.json', JSON.stringify(newData), err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
  })
})
