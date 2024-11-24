const whitelist = ['http://localhost:4000', 'https://role-based-access-control-ui-six.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export default corsOptions;
