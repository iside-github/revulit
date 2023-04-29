import jwt from 'jsonwebtoken';

const signToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            roles: user.roles,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '30d',
        }
    );
};
const isAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
const checkUserRole = (role) => async (req, res, next) => {
    isAuth(req, res, () => {
        if (req.user.roles && req.user.roles.includes(role)) {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    });
};

export { signToken, isAuth, checkUserRole };
