import { Magic } from '@magic-sdk/admin';

let magic = new Magic(process.env.MAGIC_SECRET_KEY);

const login = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const did = magic.utils.parseAuthorizationHeader(req.headers.authorization);
  const user = await magic.users.getMetadataByToken(did);

  res.end();
};

export default login;
