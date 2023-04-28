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
    const LOGIN_QUERY = gql`
      query Login($email: String!, $password: String!) {
        login(logInModelIn: {email: $email, password: $password}) {
          user {
            id
            email
          }
          token
        }
      }
    `;

    try {
      const response = await client.query({
        query: LOGIN_QUERY,
        variables: {
          email,
          password,
        },
      });

      const token = response.data.login.token;
      const userId = response.data.login.user.id;
      const cookies = new Cookies(req, res);

      const USER_INFO_QUERY = gql`
        query User($id: Int!) {
          user(id: $id) {
            id
            name
            phone
            organizationId
            email
            role
          }
        }
      `;

      cookies.set('authorization', token, {
        httpOnly: true,
        sameSite: 'strict',
      });
      req.cookies['authorization'] = token;

      setClientToken(token);

      const userInfo = await client.query({
        query: USER_INFO_QUERY,
        variables: {
          id: userId,
        },
      });

      req.session.user = userInfo.data.user;
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
