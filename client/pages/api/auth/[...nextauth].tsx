import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({path: path.join(__dirname, '..', '..', '.env.local')})

