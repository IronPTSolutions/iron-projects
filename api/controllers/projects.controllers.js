const Project = require("../models/project.model");

module.exports.list = (req, res, next) => {
  const { cohort } = req.query;
  
  const criterial = {};
  if (cohort) criterial.cohort = cohort;

  Project.find(criterial) // TODO: filters
    .populate("comments authors cohort")
    .then((projects) => res.json(projects))
    .catch(next);
};

module.exports.create = (req, res, next) => {
  req.body.cohort = req.user.cohort;
  req.body.authors = [req.user.id];
  Project.create(req.body)
    .then((project) => res.status(201).json(project))
    .catch(next);
};

module.exports.detail = (req, res, next) => res.json(req.project);

module.exports.delete = (req, res, next) => {
  Project.deleteOne({ _id: req.project.id })
    .then(() => res.status(204).send())
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Object.assign(req.project, req.body);
  req.project
    .save()
    .then((project) => res.json(project))
    .catch(next);
};
