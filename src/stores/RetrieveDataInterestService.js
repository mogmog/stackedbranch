var customData = require('./v_interest_sites.json');

let data = [];

export function fetchData () {
  return new Promise((resolve, reject) => {
    // Mock data fetching service
    if (true) {

      resolve(customData)
    } else {
      reject([])
    }
  })
}
