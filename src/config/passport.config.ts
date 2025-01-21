import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: 'Invalid login.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid login.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error); // Handle any unexpected errors
      }
    },
  ),
);

// Serialize user into the session
passport.serializeUser((user: any, done) => {
  done(null, user.id); // Store the user's ID in the session
});

// Deserialize user from the session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'surname', 'nickName', 'email', 'age', 'role'],
    });

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
