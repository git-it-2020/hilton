import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, {NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  session:
  {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const {email} = credentials as {email: string, password: string}
        return { id: "1", name: email}
      },
    })
  ],
  pages: {
    signIn: '/login'
  },
}
export default NextAuth(authOptions)
