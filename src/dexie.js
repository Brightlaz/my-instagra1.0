import Dexie from 'dexie'

const database = new Dexie('my data')

database.version(1).stores({
    bio: ',name,about',
    gallery: '++key,url'
})

export default database