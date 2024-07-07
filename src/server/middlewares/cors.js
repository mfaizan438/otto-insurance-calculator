const cors = require('cors');

const corsUrl = process.env.CORS_URL.split(", ");

const corsOptions = {
    origin: function (origin, callback) {
        if (corsUrl.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("-- incoming request origin", origin)
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: 'POST,GET,OPTIONS,PATCH, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);