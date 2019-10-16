import passport from 'passport'
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
import {UserModel} from './models'

// Strategy when user login
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },async (email, password, cb) => {

        try{

            const user = await UserModel.findOne({email});

            if(!user)

                return cb(null, false, {
                    message: 'Unknow account'
                });

            const passwordVerify = await user.verifyPassword(password);

            if(!passwordVerify)

                return cb(null, false, {
                    message: 'Incorrect password'
                });

            return cb(null, user);

        }catch (e) {

             console.log(e);

            return cb(e);
        }
    }
));

// strategy to protect route
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN
}, async (payload: any, cb) => {

    try{

        const user = await UserModel.findById(payload.sub);

        const date = new Date();

        if(!user || payload.exp < date.getTime())

            return cb(null, false);

        return cb(null, user)

    }catch (e) {

        return cb(e);
    }
}));

export default passport;