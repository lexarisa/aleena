import app from './app';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.dev.env') });

// const PORT = process.env.PORT;
const PORT = 3001;
//for the SSE i set the port to 3001

app.listen(PORT, (): void => {
  console.log(`👻 Server up and running on http://localhost:${PORT} 👻`);
});
