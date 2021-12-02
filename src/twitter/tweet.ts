import config from 'config';
import Twitter from 'twitter';

const twitterConfig: {
  apiKey: string,
  apiSecretKey: string,
  accessToken: string,
  accessTokenSecret: string,
} = config.get('twitter');

const client = new Twitter({
  consumer_key: twitterConfig.apiKey,
  consumer_secret: twitterConfig.apiSecretKey,
  access_token_key: twitterConfig.accessToken,
  access_token_secret: twitterConfig.accessTokenSecret
});


const tweet = async (status: string): Promise<string> => {
  const params = {
    status,
  }

  if (process.env.NODE_ENV === 'production') {
    const response = await client.post('statuses/update', params);
    return response.id_str;
  }

  return status;
}


export {
  tweet,
};
