import { Twitter } from 'twitter-node-client';

export class TwitterService {
    private twitter: Twitter;

    constructor() {
        this.twitter = new Twitter();
    }

    public test() {
        console.log("yo");
        this.twitter.getTweet({ id: '1111111111'}, this.errorCb , (data: any) => {
            console.log('Data [%s]', data);
        });
        console.log("yo2");
    }

    private errorCb = (err: any) => {
        console.log('ERROR [%s]', err);
    }
}