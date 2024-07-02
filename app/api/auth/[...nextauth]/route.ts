import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

// Update this when switching databases if needed
const supabaseUrl = 'https://kalbwmivszjzlnepcebm.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/',
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        username: {},
        password: {},
      },

      async authorize(credentials, req) {
        // TODO: Validate email, username, and password

        // Call Supabase database function to get the user associated with this username
        const { data, error } = await supabase.rpc('get_user_from_username', {
          _username: credentials?.username,
        });
        if (error) console.error(error);
        else console.log('Got user');

        const user = data;
        console.log({ user });

        // Compare encrypted password in db to inputted password
        const passwordCorrect = await compare(
          credentials!.password || '',
          user.password,
        );

        if (passwordCorrect) {
          console.log('User password is correct. Logging in.');
          return {
            id: user.id,
            email: user.email,
            name: user.username,
          };
        }

        // console.log(credentials);

        console.log(
          'Password was incorrect or another issue occured during login.',
        );
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
