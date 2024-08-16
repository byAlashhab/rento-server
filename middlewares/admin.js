function admin(req, res, next) {
  const user = req.user;

  if (user.role !== "admin") {
    return res.sendStatus(403);
  }
  next();
}

module.exports = admin;