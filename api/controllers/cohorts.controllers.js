const Cohort = require("../models/cohort.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  Cohort.create(req.body)
    .then((cohort) => res.json(cohort))
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Cohort.find() // TODO: filters
    .populate("students")
    .sort({ start: -1 })
    .then((cohorts) => res.json(cohorts))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Cohort.findById(req.params.id)
    .populate("students")
    .then((cohort) => {
      if (!cohort) {
        return next(createError(404, "Cohort not found"));
      }
      res.json(cohort);
    })
    .catch(next);
};
