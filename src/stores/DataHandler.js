import crossfilter from 'crossfilter2'
import _ from 'lodash'
class DataHandler {
  constructor (data = []) {

    this.data = data;

    // Create crossfilter object
    this.ndx = crossfilter([])



  }

  add (data) {

    console.log(data);

    this.data = _.concat(this.data, data)
    this.ndx.add(data)

    //console.log(this.ndx.size())

    return this
  }

  getGeoData () {

    return this.ndx.dimension((d) => d).top(Infinity).map(x => {

          return {
              lat: x.lat,
              lng: x.lng,
              data: {
                  country: 'v.value.country',
                  userName: 'v.value.userName',
                  id: 'v.value.id',
              },
          }
      })
  }

  updateGroups () {
    //do something with groups


    //this.idCategoryDimension = this.ndx.dimension((d) => [d.id, d.category])
  }

}

export default DataHandler
