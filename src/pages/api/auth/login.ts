import {NextApiRequest, NextApiResponse} from 'next';
import Cookies from 'cookies';
import {withIronSessionApiRoute} from 'iron-session/next';
import {gql} from '@apollo/client';
import {ironSessionOptions} from '@/lib/utils/iron-session';
import client, {setClientToken} from '@/apollo-client';
import {GENERAL_SERVER_ERROR, NO_CREDENTIALS} from '@/lib/utils/api-messages-helper';

export default withIronSessionApiRoute(handler, ironSessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    const {email, password} = req.body;
    if (!email || !password) {
      res.status(400);
      res.json({error: NO_CREDENTIALS});
      return;
    }
    const LOGIN_MUTATION = gql`
      mutation Login($email: String!, $password: String!) {
        login(data: {email: $email, password: $password}) {
          accessToken
          user {
            id
            name
            phone
            organizationId
            email
            role
          }
        }
      }
    `;

    try {
      const response = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email,
          password,
        },
      });

      const {accessToken, user} = response.data.login;

      const cookies = new Cookies(req, res);

      cookies.set('authorization', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
      });
      req.cookies['authorization'] = accessToken;

      setClientToken(accessToken);

      req.session.user = user;
      await req.session.save();
      res.status(200);
      return res.json(response.data.login);
    } catch (error: any) {
      console.log('ERROR >>>', error);
      res.status(500);
      return res.json({error: error.message || GENERAL_SERVER_ERROR});
    }
  }
}
