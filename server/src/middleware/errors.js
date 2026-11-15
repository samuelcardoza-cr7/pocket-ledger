export function notFound(req, res) { res.status(404).json({ message: 'That endpoint does not exist.' }); }

export function handleError(error, req, res, next) {
  if (res.headersSent) return next(error);
  if (error?.code === 11000) return res.status(409).json({ message: 'An account with that email already exists.' });
  if (error?.name === 'ValidationError' || error?.name === 'CastError') return res.status(400).json({ message: 'Please check the submitted information.' });
  if (Number.isInteger(error?.status) && error.status >= 400 && error.status < 500) return res.status(error.status).json({ message: error.message });
  console.error(error);
  res.status(500).json({ message: 'Something went wrong. Please try again.' });
}
