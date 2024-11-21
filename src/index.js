import 'dotenv/config';
import connectToDB from './db/index.js';
import app from './app.js';

(async () => {
  try {
    await connectToDB();

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('ERROR:', error);
    process.exit(1);
  }
})();
