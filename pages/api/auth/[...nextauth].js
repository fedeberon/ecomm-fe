import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

const options = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials) {
        const { username, password } = credentials;
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/login`, {
            username: username,
            password: password
          });

          if (res.status === 200) {
            return res.data;
          } else {
            return Promise.reject(`${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/login/error`);
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return Promise.reject(`${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/login/error`);
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
    error: '/login/error',
    verifyRequest: '/auth/verify-request',
    newUser: null
  },

  callbacks: {
    async signIn(user) {
      return user;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.user=user
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user= token.user;
      return session;
    }
  },

  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    }
  }
};

export default (req, res) => NextAuth(req, res, options);