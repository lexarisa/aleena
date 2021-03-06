import axios, { AxiosResponse } from "axios";
import { INewUser } from './../interfaces/user'
import dotenv from 'dotenv';
import path from 'path'

dotenv.config({ path: path.join(__dirname, '..', '.dev.env') });

export class GitHubService {

    async gitToken(code: string, state?: string): Promise<string> {

        const url = 'https://github.com/login/oauth/access_token';

        const params = {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
        }

        const accessToken = await axios.post(url, params)
        .then((res: AxiosResponse) => {
            // format data 
            const data = res.data.split('&')
            .map((el: string) => el.split('='))
            [0][1];

            return data;
        })

        return accessToken;
    }

    gitUser(token: string): Promise<INewUser> {
        const url = 'https://api.github.com/user';

        const headers = {
            Authorization: `Bearer ${token}`
        }

        const user = axios.get(url, { headers })
        .then((res: AxiosResponse) => {
            const data = {
                id: res.data.id,
                email: res.data.email,
                name: res.data.name,
                username: res.data.login,
                profile_pic: res.data.avatar_url,
            }

            return data;
        });

        return user;
    }

    gitPayload(payload: any): void {
        console.log('GOT ITTTT');
        // console.log(payload.body);
    }

}
