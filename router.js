var school = require('./routes/school');
var teacher = require('./routes/teacher');

module.exports = function (app) {
  app.post('/school/register', function (req, res) {
    school.post_register(req, res);
  });

  app.get('/school/info/*', function (req, res) {
    school.get_info(req, res);
  });

  app.get('/school/list', function (req, res) {
    school.get_list(req, res);
  });

  app.delete('/school/delete', function (req, res) {
    school.delete_school(req, res);
  });

  // --------------------------------------------------------------------------

  app.post('/teacher/register', function (req, res) {
    teacher.post_register(req, res);
  });

  app.get('/teacher/list', function (req, res) {
    teacher.get_list(req, res);
  });

  app.get('/teacher/info/*', function (req, res) {
    teacher.get_info(req, res);
  });

  app.delete('/teacher/delete', function (req, res) {
    teacher.delete_teacher(req, res);
  });

  // --------------------------------------------------------------------------

};