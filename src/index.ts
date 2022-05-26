import 'reflect-metadata';
import 'dotenv/config';
// import startRabbitMQ from './app/drivers/rabbitmq';
import startHttpServer from './app/drivers/http/server';
import startMongoDB from './app/drivers/mongodb';
import { server } from './config';

// startRabbitMQ();
startMongoDB();
const app = startHttpServer();

app.listen(server.port, () => {
  console.log(`Server running on port ${server.port}`);
});
