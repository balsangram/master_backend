export const validateMultiple = (schemas) => {
    return (req, res, next) => {
        try {
            for (const [property, schema] of Object.entries(schemas)) {
                if (schema && req[property]) {
                    // Special handling for query parameters - allow empty queries
                    if (property === 'query' && Object.keys(req[property]).length === 0) {
                        console.log('✅ validateMultiple: Empty query parameters allowed, skipping validation');
                        continue;
                    }

                    const { error, value } = schema.validate(req[property], {
                        abortEarly: false,
                        stripUnknown: true,
                        allowUnknown: true // Allow unknown properties for query parameters
                    });

                    if (error) {
                        const errorMessage = error.details
                            .map(detail => detail.message)
                            .join(', ');

                        throw new ApiError(400, `Validation Error in ${property}: ${errorMessage}`);
                    }

                    req[property] = value;
                }
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};