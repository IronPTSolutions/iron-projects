const Like = require("../models/like.model");

module.exports.toggle = (req, res, next) => {
  const params = {
    project: req.params.id,
    student: "642f01f89976f8ca4da9be66", // TODO: add auth. req.user.id,
  };

  Like.findOne(params)
    .then((like) => {
      if (like) {
        Like.deleteOne({ _id: like.id })
          .then(() => res.status(204).send())
          .catch(next);
      } else {
        Like.create(params)
          .then((like) => res.json(like))
          .catch(next);
      }
    })
    .catch(next);
};
