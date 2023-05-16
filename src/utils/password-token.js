import jwt from 'jsonwebtoken';

export const createToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '5m',
        }
    );
};

export const checkToken = async (req, res, next) => {
    const { auth } = req.headers;
    if (auth) {
        jwt.verify(auth, process.env.JWT_SECRET_KEY, (err, decode) => {
            if (err) {
                return res
                    .status(401)
                    .json({ message: 'The token is invalid' });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
