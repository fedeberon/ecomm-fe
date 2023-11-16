import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

const options = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'credentials',
            async authorize (credentials) {
                const {username, password} = credentials;
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/login`, {
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
                    return Promise.reject(`${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/login/error`)
                    // You can also Reject this callback with an Error or with a URL:
                    // return Promise.reject(new Error('error message')) // Redirect to error page
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
            
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/auth/signout',
                                 // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: null  // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async signIn(user) {
            return user;
        },
        async session(session,user, token) {
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


