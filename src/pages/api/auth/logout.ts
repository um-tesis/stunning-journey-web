import {NextApiRequest, NextApiResponse} from 'next';
import {withIronSessionApiRoute} from 'iron-session/next';
import Cookies from 'cookies';
import {ironSessionOptions} from '@/lib/utils/iron-session';
import {SUCCESSFUL_LOGOUT} from '@/lib/utils/api-messages-helper';

export default withIronSessionApiRoute(handler, ironSessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    const cookies = new Cookies(req, res);
    cookies.set('authorization', null);
    cookies.set('auth-serv', null);
    req.session.destroy();
    res.status(200);
    res.send(SUCCESSFUL_LOGOUT);
  }
}
