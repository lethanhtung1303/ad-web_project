const mongoose = require('mongoose');
require('dotenv').config();
const connectionString = process.env.URI_MONGO;
if (!connectionString) {
    console.error('MongoDB connection string missing!');
    process.exit(1);
}
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB error: ' + err.message);
    process.exit(1);
});
db.once('open', () => console.log('MongoDB connection established'));
