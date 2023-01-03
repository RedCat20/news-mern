import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const tokenWithBearer = req.headers.authorization || '';

  // console.log('tokenWithBearer', tokenWithBearer)
  const pureToken = tokenWithBearer.replace(/Bearer\s?/, '');


  if (!pureToken) {
    console.log('!pureToken', pureToken);

    return res.status(403).json({
      message: 'No access',
      error: 'No pureToken'
    });
  }

  try {
    const decodedToken = jwt.verify(pureToken, 'secret-posts');
    // console.log(decodedToken)
    req.userId = decodedToken._id;
    // console.log('req.userId', req.userId)
    next();
  } catch (err) {
    console.log('No access', err)
    return res.status(403).json({
      message: 'No access',
      error: err
    });
  }
}