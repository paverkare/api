import jwt from 'jsonwebtoken';
import {IUser, UserModel} from "../models";
import {HttpException} from "../helpers/HttpException";

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

    async register(email: string, password: string, firstName: string, lastName: string): Promise<IUser> {

        const findUser = await UserModel.findOne({email: email});

        if (findUser)

            throw new HttpException(409, "A user with this email already exits");

        return await UserModel.create({
            email,
            password,
            firstName,
            lastName
        });
    }
}

export default new UserController();