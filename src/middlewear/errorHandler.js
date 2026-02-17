function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).json({
        message: "something went wrong!",
        error: String(err)
    });
}

export default errorHandler;

