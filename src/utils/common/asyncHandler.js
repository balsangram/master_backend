const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        } catch (error) {
            console.log("Error in asyncHandler :", error);
            next(error);
        }
    }
}

export { asyncHandler };