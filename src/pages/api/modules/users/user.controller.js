import { UserModel } from './user.entity.js';

export default class UserController {
    getAllUsers = async (req, res) => {
        try {
            const users = await UserModel.find();
            res.json(users);
        } catch (err) {
            console.log(err.message);
        }
    };
}
