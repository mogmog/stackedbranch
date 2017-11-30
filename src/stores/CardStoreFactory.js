import Freezer from 'freezer-js'
import DataHandler from './DataHandler'
import { fetchData } from './RetrieveDataInterestService'

var CardStoreFactory = function() {

    var Store = new Freezer({ data: [], dh: new DataHandler()}, {live: true});

    Store.on('fetchData:all', () =>
    {

        fetchData()
            .then((data) => {

                // The 'add' function from 'dh', will not trigger an update since the store hasn't changed.
                Store.get().dh.add(data)
                // Changing the data value will change the store, triggering an update.
                Store.get().set({
                    data: data,
                })
            })
    })

    return Store;
}

export default CardStoreFactory
