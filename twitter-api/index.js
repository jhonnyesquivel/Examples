const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const request = require('request').defaults({ encoding: null });;
require('dotenv').config()

//Configure credentiials
const client = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
});


//twit uploading a imagen
const twit = async (status, url) => {
    download(url, async (buffer) => {
        let upload = await client.v1.uploadMedia(buffer, { type: "png" });
        console.log(upload);
        await client.v1.tweet(status, { media_ids: upload });
    });
}

//download a resource and send body as buffer
const download = (uri, callback) => {
    request.get(uri, function (err, res, body) {
        callback(body);
    });
};

module.exports = { twit }
