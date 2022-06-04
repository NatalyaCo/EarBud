const localStorage = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function start(passport, getUserByEmail){
    const complyUser = (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null){
            return done(null, false, {messager: "There isn't an account with that email yet!"})
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                
            } else{
                return done(null, false, { message: "Wrong Password!"})
            }
        } catch (e){
            return done(e)
        }
    }

    passport.use(new localStorage({ usernameField: 'email'}), complyUser )
    passport.serializeUser((user,done) => {  })
    passport.deserializeUser((id,done) => {  })
}

module.exports = start