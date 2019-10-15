declare module 'twitter-node-client' {
    export interface ITwitterConfig {
        consumerKey: string;
        consumerSecret: string;
        accessToken: string;
        accessTokenSecret: string;
        callBackUrl: string;
    }
    export class Twitter {
        constructor(config: ITwitterConfig);
        getTweet: Function;
    }
}