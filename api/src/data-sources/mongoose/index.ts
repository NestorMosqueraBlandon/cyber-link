import { connection, connect } from 'mongoose';

export interface InitMongooseOptions {
    mongoUrl?: string;
}

export const initMongoose = async ({mongoUrl}: InitMongooseOptions) => {
    const conn = connection;
    const connectionUrl = mongoUrl || '';
    conn.on('error', (err) => {
        console.error(`Error on mongoose connection: ${JSON.stringify(err)}`);
        throw new Error(err);
    });
    conn.on('connected', () => {
        console.info(`Mongoose connection: ${connectionUrl}`);
    });
    conn.on('reconnectedFailed', () => {
        console.error(`Mongoose: DB Connection Lost, retries failed`);
    });
    await connect(connectionUrl, {
        autoIndex: true
    });
}