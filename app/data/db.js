import mongojs from 'mongojs'

const db = mongojs('greensomething')

export let getCollection = (collectionName) => {
  return db.collection(collectionName)
}
