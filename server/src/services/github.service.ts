import axios from 'axios';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.dev.env') });

export class GitHubService {
  async gitLogin(code: string, state?: string): Promise<any> {
    const url = 'https://github.com/login/oauth/access_token';

    const params = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    };

    const see = await axios.post(url, params).then((response) => {
      console.log('logger', response.data);
      return response.data;
    });

    return see;
  }

  gitPayload(payload: any): void {
    console.log(payload);
    return payload;
  }
}
