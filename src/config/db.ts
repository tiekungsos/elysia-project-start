import * as mongoose from 'mongoose';

import config from '.';

const { dbUsername, dbPassword, dbHost, dbPort, dbName } = config.db;
const connectionString = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`

export const connect = async () => {
  try {
    const res = await mongoose.connect(connectionString, { autoIndex: true });

    console.log('Info: MongoDB connection successful:', res.connection.name);
  } catch (err) {
    console.log('Error: Failed to connect MongoDB:', err);
  }
};
