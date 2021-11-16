import NextAuth from "next-auth"
import Providers from 'next-auth/providers';
import axios from "axios";

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'credentials',
            async authorize (credentials) {
                const {username, password} = credentials;
                const res = await axios.post("http://localhost:8888/eComm/login", {
                    "username": username,
                    "password": password
                });
                if (res.status == 200) {
                    // Any object returned will be saved in `user` property of the JWT
                    return res.data;
                } else {
                    //return Promise.reject('localhost:3000')
                    // Redirect to a URL
                    // If you return null or false then the credentials will be rejected
                    return Promise.reject(new Error('Datos incorrectos'))
                    // You can also Reject this callback with an Error or with a URL:
                    // return Promise.reject(new Error('error message')) // Redirect to error page
                }
            }
        }),
    ],
    pages: {
        signIn: '/login',
        signOut: '/auth/signout',
        error: '/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: null // If set, new users will be directed here on first sign in
    },
    callbacks: {
        async signIn(user) {
            return user;
        },
        async session(session, token) {
            session.user = token.user;
            return session;
        },
        async jwt(token, user) {
            if (user) token.user = user;
            return token;
        },
    },
    logger: {
        error(code, metadata) {
            console.error(code, metadata)
        },
        warn(code) {
            console.warn(code)
        },
        debug(code, metadata) {
            console.debug(code, metadata)
        }
    }
}
export default (req, res) => NextAuth(req, res, options);


