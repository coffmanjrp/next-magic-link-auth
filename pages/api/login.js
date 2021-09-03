import { Magic } from '@magic-sdk/admin';
import Iron from '@hapi/iron';
import CookieService from '../../lib/cookie';

const login = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const did = req.headers.authorization.split('Bearer').pop().trim();
  const user = await new Magic(
    process.env.MAGIC_SECRET_KEY
  ).users.getMetadataByToken(did);

  const token = await Iron.seal(
    user,
    process.env.ENCRYPTION_SECRET,
    Iron.defaults
  );
  CookieService.setTokenCookie(res, token);

  res.end();
};

export default login;
