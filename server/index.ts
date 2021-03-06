import * as express from 'express';
import * as http from 'http';
import * as moment from 'moment';
import { TwitterService } from './services/twitter-service'

// Config tweaking
require('source-map-support').install(); // For .js.map's
process.on('unhandledRejection', console.error); // Better logging in promises
process.setMaxListeners(0); // Mem leak erros

Init();

async function Init() {
    // Init services
    var twitterService = new TwitterService();

    // Init express server
    const app = express();
    http.createServer(app);

    const port = process.env['PORT'] || 4000;

    // Serve client files
    app.use(express.static('../app/dist'));
    const server = app.listen(port, () => {
        console.log(`${moment().format()}: special-delivery 📦 is running at localhost: ${port}`);
    });

    const bodyParser = require('body-parser');
    app.use(bodyParser.json());

    // Router
    app.get("/api/", function(req, res) {
        res.status(200).send("Welcome to our restful API");
    });

    app.post("/api/posts/", function(req, res) {
        let message = req.body.message;
        let imageData = req.body.imageData;
        twitterService.UploadTweet(message, imageData);
        res.status(200);
    });

    app.get("/api/posts/", async function(req, res) {
        var resp = await twitterService.GetTweets();
        res.status(200).send(resp);
    });

}