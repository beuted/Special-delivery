import * as Twitter from 'twitter';
import * as fs from 'fs';
import * as moment from 'moment';
import { Post } from '../models/post';

export class TwitterService {
    private twitter: Twitter;

    constructor() {
        let configRaw: Buffer;
        try {
            configRaw = fs.readFileSync('./data/twitter_config.json');
        } catch (err) {
            console.error(`ERROR: Could not find "data/twitter_config.json". If you have not created it, use data/twitter_config.template.json and fill the data`);
            return;
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

    public async GetTweets(): Promise<Post[]> {
        let response: Twitter.ResponseData = [];
        try {
            response = await this.twitter.get('statuses/user_timeline', { screen_name: 'dekajoo' });
        } catch (e){
            console.error(`${moment().format()}: Error getting tweet : ${JSON.stringify(e)}`);
            return [];
        }

        return response.map((x: any) => ({
            created_at: x.created_at,
            id_str: x.id_str,
            text: x.text,
            retweet_count: x.retweet_count,
            favourites_count: x.user.favourites_count
        }));
    }
}