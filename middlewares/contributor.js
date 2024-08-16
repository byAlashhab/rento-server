function contributor(req, res, next) {
  const user = req.user;

  if (user.role !== "admin" || user.role !== "contributor") {
    return res.sendStatus(401);
  }
  next();
}

module.exports = contributor;
