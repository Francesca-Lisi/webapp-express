const sanitizeData = (req, res, next) => {
  const sanitize = (value) => {
    if (typeof value === 'string') {
      return value
        .trim()
        .replace(/<[⌃>]*>/g, '');
    }
    return value
  };

  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = sanitize(req.body[key]);
      }
    }
  }

  next();
};

module.exports = sanitizeData