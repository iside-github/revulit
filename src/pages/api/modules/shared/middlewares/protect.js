import ErrorResponse from '../utils/errorResponse';

export const protect = async (req, res, next) => {
    try {
        const authToken = req.headers.auth;

        if (!authToken)
            throw new ErrorResponse(
                401,
                `Ruxsatingiz yo'q iltimos login qiling`
            );

        var decodedToken;
        verify(String(authToken), accessToken.secret, (err, decode) => {
            if (err) throw new ErrorResponse(401, 'Token yaroqsiz!');
            decodedToken = decode;
        });

        if (!decodedToken || decodedToken.token_type !== 'access')
            throw new ErrorResponse(401, 'Ruxsat berilmagan!');

        const user = await usersDao.findOne(decodedToken.user_id);

        if (!user) throw new ErrorResponse(401, 'Foydalanuvchi mavjud emas');

        req.body.user_id = user._id;

        next();
    } catch (error) {
        next(error);
    }
};
