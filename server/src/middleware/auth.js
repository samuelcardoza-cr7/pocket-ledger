import { getAuth } from '@clerk/express';

export function requireAuth(req, res, next) {
  const auth = getAuth(req);
  if (!auth.isAuthenticated || !auth.userId) return res.status(401).json({ message: 'Please sign in to continue.' });
  req.userId = auth.userId;
  next();
}
