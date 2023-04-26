require('dotenv').config();
require('../config/db.config');

const mongoose = require('mongoose');
const Cohort = require('../models/cohort.model');
const Student = require('../models/student.model');
const Project = require('../models/project.model');
const cohortsData = require('../data/cohorts.json');
const studentsData = require('../data/students.json');
const projectsData = require('../data/projects.json');

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);
  mongoose.connection.db.dropDatabase()
    .then(() => console.log(`- Database dropped`))
    .then(() => Cohort.create(cohortsData))
    .then(cohorts => {
      console.info(`- Added ${cohorts.length} cohorts`)
      // Find student cohort id by start date
      const studentsDataWithCohortsIds = studentsData.map(student => {
        student.cohort = cohorts.find(cohort => cohort.start.toISOString() === student.cohort)?.id;
        return student;
      })
      return Student.create(studentsDataWithCohortsIds);
    })
    .then(students => {
      console.info(`- Added ${students.length} students`);
      // Find student id by username
      const projectsDataWithCohortsAndStudentsIds = projectsData.map(project => {
        const projectOwners = students.filter(student => project.authors.includes(student.username))
        project.authors = projectOwners.map(student => student.id);
        project.cohort = projectOwners[0]?.cohort;
        return project;
      })
      return Project.create(projectsDataWithCohortsAndStudentsIds);
    })
    .then((projects) => console.info(`- Added ${projects.length} projects`))
    .then(() => console.info(`- All data created!`))
    .catch(error => console.error(error))
    .then(() => process.exit(0))
})