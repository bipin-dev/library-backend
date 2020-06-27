const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const jwt = require("jsonwebtoken");
const _ = require("underscore");

class PassportService {
  constructor(framework, config) {
    this.config = config;
    this.fr = framework;
  }

  getPassport() {
    return passport;
  }

  initialize() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "username",
          passReqToCallback: true
        },
        async (req, username, password, done) => {
          console.log("inside req.body , ", req.body);
          let type = req.body.type;

          let result = await this.fr.AuthenticationService.findUser({
            username: username,
            password: password,
            roles: type
          });

          if (result._id) {
            console.log(`LocalStrategy loggedIn user : ${result.username}`);
            return done(null, result);
          }
          if (!result._id) {
            console.log(",.....incorrect credentials");
            return done(null, false, { message: "Incorrect credentials." });
          }
        }
      )
    );

    let jwtConfig = Object.assign(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.config.secretJWT
      },
      this.config.jwt
    );

    passport.use(
      new JWTStrategy(jwtConfig, (jwtPayload, cb) => {
        return this.fr.DBManager.db.users
          .find({ _id: jwtPayload._id })
          .then((user) => {
            return cb(null, _.omit(user[0], "password"));
          })
          .catch((err) => {
            return cb(err);
          });
      })
    );

    passport.serializeUser((user, done) => {
      console.log(
        `--serializeUser  User id is save to the session file store here : ${user.id}`
      );
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      console.log(`--deserializeUser user id passport: ${id}`);
      let result = await this.fr.DBManager.db.user.findById(id);
      let user = result._id === id ? result : false;
      done(null, user);
    });

    return passport;
  }

  // for different login strategies use the switch method to login

  authenticate(req, res) {
    passport.authenticate(
      "local",
      {
        session: false
      },
      (err, user, info) => {
        req.login(
          user,
          {
            session: false
          },
          (err) => {
            console.log(`--authenticate user : ${JSON.stringify(req.user)}`);
            //console.log(`--session id is ${req.sessionID}`);
            if (!user) {
              res.send({
                authenticated: false
              });
            }
            let token = jwt.sign(user.toJSON(), this.config.secretJWT, {
              expiresIn: 24 * 60 * 60 // 1 day
            });

            return res.send({
              authenticated: true,
              token: token,
              user: req.user
            });
          }
        );
      }
    )(req, res);
  }

  signJWT(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.config.secretJWT, this.config.jwt, (e, token) => {
        if (e) {
          return reject(e);
        }
        return resolve(token);
      });
    });
  }
}

module.exports = PassportService;
