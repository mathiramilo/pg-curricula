import { env } from '../config';

export const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const apiKeyValid = apiKey === env.API_KEY;

  if (!apiKeyValid) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }

  next();
};
