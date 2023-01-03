import mongoose from "mongoose";

export const dbConnect = () => {

  const connectParams = {
    useNewUrlParser: true
  };

  mongoose
    .set('strictQuery', false)
    .connect(
      process.env.DB || 'mongodb+srv://admin:1111@cluster0.otlrykd.mongodb.net/news?retryWrites=true&w=majority',
      connectParams
    )
    .then(() => console.log('Mongo db is connected'))
    .catch((err) => console.log('Error in mongo db connection', err));

  mongoose.connection.on('connected', () => {
    console.log('Database connection is successful');
  });

  mongoose.connection.on('error', (err) => {
    console.log('Error from database connection ', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnect database connection');
  });

};