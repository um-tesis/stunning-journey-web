import {ironSessionOptions} from '@/lib/utils/iron-session';
import {withIronSessionApiRoute} from 'iron-session/next';
import {NextApiResponse} from 'next';

export default withIronSessionApiRoute(handler, ironSessionOptions);

async function handler(req: any, res: NextApiResponse<any>) {
  const authorization = req.session.authorization;

  if (authorization) {
    res.json({loggedIn: true, authorization});
  } else {
    res.json({loggedIn: false});
  }
}
