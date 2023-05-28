import {withIronSessionApiRoute} from 'iron-session/next';
import {ironSessionOptions} from '@/lib/utils/iron-session';
import {NextApiRequest, NextApiResponse} from 'next';

export default withIronSessionApiRoute(handler, ironSessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    // update session
    req.session.user = req.body.user;
    await req.session.save();
    res.send('OK');
  }
}
