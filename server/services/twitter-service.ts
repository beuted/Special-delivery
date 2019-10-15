import { Twitter, ITwitterConfig } from 'twitter-node-client';
import * as fs from 'fs'

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

    public test() {
        console.log("yo");
        this.twitter.getTweet({ id: '1111111111'}, this.errorCb , (data: any) => {
            console.log('Data [%s]', data);
        });
        console.log("yo2");
    }

    private errorCb = (err: any) => {
        console.log('ERROR [%s]', JSON.stringify(err));
    }
}