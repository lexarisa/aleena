import app from './app';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const PORT = process.env.PORT;

//for the SSE i set the port to 3001

app.listen(PORT, (): void => {
  console.log(`👻 Server up and running on http://localhost:${PORT} 👻`);
});
