import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT,(): void => {
    console.log(`👻 Server up and running on http://localhost:${PORT} 👻`);
});
