import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongoServer = new MongoMemoryServer()

const connect = async () => {
  await mongoServer.ensureInstance()
	const mongoUri = mongoServer.getUri()
	try {
		await mongoose.connect(mongoUri, {dbName: 'mongo-memory'}).then(() => console.log('Connected'))
	} catch (error) {
		console.error(error)
	}
}

const close = async () => {
	await mongoose.disconnect()
	await mongoServer.stop()
}

const clear = async () => {
	const collections = mongoose.connection.collections

	for (const key in collections) {
		await collections[key].deleteMany({})
	}
}

const getCollection = async () => {
	const collections = await mongoose.connection.collections

	return collections;
}


export { connect, close, clear, getCollection }
