import connectToDB from './db/index.js';
import app from './app.js';

(async () => {
  try {
    await connectToDB();

    app.listen(config.server.port, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('ERROR:', error);
    process.exit(1);
  }
})();
