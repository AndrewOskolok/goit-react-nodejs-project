exports.getCurrent = async function getCurrent(req, res) {
  res.status(200).send(req.user);
};
