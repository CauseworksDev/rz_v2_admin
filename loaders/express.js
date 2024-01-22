const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = async (app) => {
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.enable('trust proxy');

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use((err, req, res, next) => {
        const { status, message } = err
        console.error(err)
        res.status(status || 500).json({ message })
    })

    return app;
}