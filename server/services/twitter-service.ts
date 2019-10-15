import * as Twitter from 'twitter';
import * as fs from 'fs'
import moment = require('moment');

export class TwitterService {
    private twitter: Twitter;

    constructor() {
        let configRaw: Buffer = fs.readFileSync('./data/twitter_config.json');
        if (configRaw == null) {
            console.error(`Could not find "data/twitter_config.json". If you have not created it, use data/twitter_config.template.json and fill the data`);
        }
        let config = JSON.parse(<string><unknown>configRaw)
        this.twitter = new Twitter(config);
    }

    public async UploadTweet(message: string, data: Buffer | null) {
        console.log(`${moment().format()}: Uploading tweet`);
        let mediaIds = undefined;
        if (data) {
            let media = await this.twitter.post('media/upload', { media: data });
            mediaIds = media.media_id_string
        }

        await this.twitter.post('statuses/update', { status: message, media_ids: mediaIds })
    }

    public async GetTweets() {
        let tweets = await this.twitter.get('statuses/user_timeline', { screen_name: 'dekajoo' });
        return tweets;
    }
}