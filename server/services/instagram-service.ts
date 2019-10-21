import { IgApiClient } from '../src';
import * as fs from 'fs';

export class InstagramService {
    constructor(private ig: IgApiClient) {
    }

    public async Init() {
        await this.login();
    }


    private async login() {
        // basic login-procedure
        this.ig.state.generateDevice(process.env.IG_USERNAME);
        this.ig.state.proxyUrl = process.env.IG_PROXY;
        await this.ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    }

    public async UploadPost(message: string, data: Buffer | null) {
        const path = './myPicture.jpg';
        const { latitude, longitude, searchQuery } = {
            latitude: 0.0,
            longitude: 0.0,
            // not required
            searchQuery: 'place',
        };

        /**
         * Get the place
         * If searchQuery is undefined, you'll get the nearest places to your location
         * this is the same as in the upload (-configure) dialog in the app
         */
        const locations = await this.ig.search.location(latitude, longitude, searchQuery);
        /**
         * Get the first venue
         * In the real world you would check the returned locations
         */
        const mediaLocation = locations[0];
        console.log(mediaLocation);

        const publishResult = await this.ig.publish.photo({
            // read the file into a Buffer
            file: await Bluebird.fromCallback(cb => fs.readFile(path, cb)),
            location: mediaLocation,
            caption: 'my caption',
            usertags: {
            in: [
                // tag the user 'instagram' @ (0.5 | 0.5)
                await this.generateUsertagFromName('instagram', 0.5, 0.5),
            ],
            },
        });

        console.log(publishResult);
    }

    /**
     * Generate a usertag
     * @param name - the instagram-username
     * @param x - x coordinate (0..1)
     * @param y - y coordinate (0..1)
     */
    private async generateUsertagFromName(name: string, x: number, y: number): Promise<{ user_id: number, position: [number, number] }> {
        // constrain x and y to 0..1 (0 and 1 are not supported)
        x = this.clamp(x, 0.0001, 0.9999);
        y = this.clamp(y, 0.0001, 0.9999);
        // get the user_id (pk) for the name
        const { pk } = await this.ig.user.searchExact(name);
        return {
            user_id: pk,
            position: [x, y],
        };
    }

    private clamp = (value: number, min: number, max: number) => Math.max(Math.min(value, max), min);
}