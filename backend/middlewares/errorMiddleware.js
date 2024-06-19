const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode || 500;
    let error = err.message || "INTERNAL SERVER ERROR !";
    // let error = err.message;
    // let error = "INTERNAL SERVER ERROR !";

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        error = "Resource Not Found";
    }

    // console.log("ERROR : ", err);

    res.status(statusCode).json({ error });
}

export { notFound, errorHandler };