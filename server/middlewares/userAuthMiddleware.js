const { API_RESPONSE_CODES } = require("../config/constants");
const prisma = require("../config/db");

const userAuthMiddleware = async (req, res, next) => {
  // const token = req.headers.authorization?.split(' ')[1];
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let result = await prisma.session.findFirst({
    where: {
      token
    },
    include: {
      user: true
    }
  })
  if (result) {
    req.user = result.user
    next()
    // console.log({ result })
  } else {
    res.status(API_RESPONSE_CODES.UNAUTHORIZED).send()
  }
  // console.log({ result })

  // Verify token (e.g., using JWT)
  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //   if (err) {
  //     return res.status(403).json({ message: 'Forbidden' });
  //   }
  //   req.user = decoded; // Attach user info to request
  //   next();
  // });
};



module.exports = userAuthMiddleware