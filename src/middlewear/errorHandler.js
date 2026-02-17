function errorHandler(err, _req, res, _next) {
    console.log(err);
    if (err.name == "NotFoundError") {
        res.status(404).json({
            message: "something went wrong!",
            error: String(err)
        });
    }
    else {
        res.status(500).json({
            message: "something went wrong!",
            error: String(err)
        });
    }
}

export default errorHandler;

