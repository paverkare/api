import mongoose from 'mongoose';

export default mongoose.connect('mongodb+srv://'+ process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + '/' + process.env.MONGO_NAME + '?retryWrites=true', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });