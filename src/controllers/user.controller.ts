import jwt from 'jsonwebtoken';
import {IUser} from "../models";

class UserController {

    private signToken(user: IUser): string {
        return jwt.sign({
            iss: 'Paverkare',
            sub: user.id as any,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, process.env.JWT_TOKEN as string);
    }

    login(user: IUser): string {

        return this.signToken(user);
    }
}

export default new UserController();