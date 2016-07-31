var schoolRoutes = require('./routes/school');
var teacherRoutes = require('./routes/teacher');
var classRoutes = require('./routes/class');
var studentRoutes = require('./routes/student');
var deckRoutes = require('./routes/deck');
var cardRoutes = require('./routes/card');

module.exports = function (app) {
  app.post('/school/register', schoolRoutes.post_register);

  app.get('/school/info/*', schoolRoutes.get_info);

  app.get('/school/list', schoolRoutes.get_list);

  app.delete('/school/delete', schoolRoutes.delete_school);

  // --------------------------------------------------------------------------

  app.post('/teacher/register', teacherRoutes.post_register);

  app.get('/teacher/list', teacherRoutes.get_list);

  app.get('/teacher/info/*', teacherRoutes.get_info);

  app.delete('/teacher/delete', teacherRoutes.delete_teacher);

  // --------------------------------------------------------------------------

  app.post('/class/post_create', classRoutes.post_create);

  app.get('/class/list/*', classRoutes.get_list);

  app.get('/class/info/*', classRoutes.get_info);

  app.delete('/class/delete', classRoutes.delete_class);

  // --------------------------------------------------------------------------

  app.post('/student/register', studentRoutes.post_create);

  app.post('/student/enroll', studentRoutes.post_enroll);

  app.post('/student/unenroll', studentRoutes.post_unenroll);

  app.get('/student/info/*', studentRoutes.get_info);

  app.get('/student/list/*', studentRoutes.get_students);

  app.delete('/student/delete', studentRoutes.delete_student);

  // --------------------------------------------------------------------------

  app.post('/deck/create', deckRoutes.post_create);

  app.get('/deck/info/*', deckRoutes.get_info);

  app.get('/deck/list/*', deckRoutes.get_decks);

  app.delete('/deck/delete', deckRoutes.delete_deck);

  // --------------------------------------------------------------------------

  app.post('/card/create', cardRoutes.post_create);

  app.post('/card/update', cardRoutes.post_update);

  app.get('/card/info/*', cardRoutes.get_info);

  app.get('/card/list/*', cardRoutes.get_list);

  app.delete('/card/delete/', cardRoutes.delete_card);
};