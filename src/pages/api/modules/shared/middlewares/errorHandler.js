const errorHandler = (error, req, res, next) => {
    const ErrorObject = {
        error: error,
        message: error.message || error.message || 'Something went wrong!',
        success: false,
    };
    console.log(ErrorObject);

    res.status(error.status || 500).send(ErrorObject);
};

export default errorHandler;
