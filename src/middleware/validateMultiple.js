import { AppError } from "../utils/common/AppError.js";
export const validateMultiple = (schemas) => {
    return (req, res, next) => {
        console.log("🚀 ~ validateMultiple ~ req:", req.body)
        try {
            for (const [property, schema] of Object.entries(schemas)) {

                if (schema && req[property]) {

                    if (property === 'query' && Object.keys(req[property]).length === 0) {
                        continue;
                    }

                    const { error, value } = schema.validate(req[property], {
                        abortEarly: false,
                        stripUnknown: true,
                        allowUnknown: true
                    });

                    if (error) {
                        const errorMessage = error.details
                            .map(detail => detail.message.replace(/"/g, ""))
                            .join(', ');

                        return res.status(400).json({
                            success: false,
                            message: errorMessage
                        });
                    }

                    req[property] = value;
                }
            }

            next();

        } catch (err) {
            next(err);
        }
    };
};
