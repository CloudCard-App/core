var schoolRoutes = require('./routes/school');
var teacherRoutes = require('./routes/teacher');
var classRoutes = require('./routes/class');
var studentRoutes = require('./routes/student');

module.exports = function (app) {
  app.post('/school/register', function (req, res) {
    schoolRoutes.post_register(req, res);
  });

  app.get('/school/info/*', function (req, res) {
    schoolRoutes.get_info(req, res);
  });

  app.get('/school/list', function (req, res) {
    schoolRoutes.get_list(req, res);
  });

  app.delete('/school/delete', function (req, res) {
    schoolRoutes.delete_school(req, res);
  });

  // --------------------------------------------------------------------------

  app.post('/teacher/register', function (req, res) {
    teacherRoutes.post_register(req, res);
  });

  app.get('/teacher/list', function (req, res) {
    teacherRoutes.get_list(req, res);
  });

  app.get('/teacher/info/*', function (req, res) {
    teacherRoutes.get_info(req, res);
  });

  // TODO: Implement get_exists for teachers, just like for classes.

  app.delete('/teacher/delete', function (req, res) {
    teacherRoutes.delete_teacher(req, res);
  });

  // --------------------------------------------------------------------------

  // Create a new class by teacher
  app.post('/class/create', function (req, res) {
    classRoutes.post_create(req, res);
  });

  // List classes for a teacher
  app.get('/class/list/*', function (req, res) {
    classRoutes.get_list(req, res);
  });

  app.get('/class/info/*', function (req, res) {
    classRoutes.get_info(req, res);
  });

  app.delete('/class/delete', function (req, res) {
    classRoutes.delete_class(req, res);
  });

  // --------------------------------------------------------------------------

  app.post('/student/register', function (req, res) {
    studentRoutes.post_create(req, res);
  });

  app.get('/student/info/*', function (req, res) {
    studentRoutes.get_info(req, res);
  });

  app.get('/student/students/*', function (req, res) {
    studentRoutes.get_students(req, res);
  });

  app.post('/student/enroll', function (req, res) {
    studentRoutes.post_enroll(req, res);
  });

  app.post('/student/unenroll', function (req, res) {
    studentRoutes.post_unenroll(req, res);
  });

  app.delete('/student/delete', function (req, res) {
    studentRoutes.delete_student(req, res);
  });
};