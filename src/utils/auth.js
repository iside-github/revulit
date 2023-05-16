import jwt from 'jsonwebtoken';

const signToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            roles: user.roles,
            company: user.company,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '30d',
        }
    );
};

const isAuth = async (req, res, next) => {
    const token = req?.cookies["next-auth.session-token"];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
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

const checkUserRole = (role) => async (req, res, next) => {
    isAuth(req, res, () => {
        if (Array.isArray(role)) {
            for (let i = 0; i < role.length; i++) {
                if (req.user.roles.includes(role[i])) {
                    next();
                    break;
                } else return res.status(403).json({ message: 'Forbidden' });
            }
        } else if (req.user.roles && req.user.roles.includes(role)) {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    });
};

export { signToken, isAuth, checkUserRole };
