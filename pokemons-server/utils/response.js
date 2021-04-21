const response = (res, statusCode, text, isError) => {
	return res.status(statusCode).json({ 
        status: { 
            message: text, 
            isError 
        } 
    });
};

module.exports = response;
