const handleAsync = asyncFunction => async (req, res, next) => {
  try {
    await asyncFunction(req, res, next);
  } catch (error) {
    console.log(error);

    res.status(error.code || 500).json({
      success: false,
      message: error.message || 'Interal server error',
    });
  }
};

export default handleAsync;
