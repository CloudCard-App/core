let schoolRoutes = require('./routes/school');
let teacherRoutes = require('./routes/teacher');
let classRoutes = require('./routes/class');
let studentRoutes = require('./routes/student');
let deckRoutes = require('./routes/deck');
let cardRoutes = require('./routes/card');
let sessionRoutes = require('./routes/session');

module.exports = function (app) {

  app.post('/school/register/', schoolRoutes.post_register);
  app.get('/school/info/*', schoolRoutes.get_info);
  app.get('/school/list/', schoolRoutes.get_list);
  app.delete('/school/delete/', schoolRoutes.delete_school);

  // --------------------------------------------------------------------------

  app.post('/teacher/register/', teacherRoutes.post_register);
  app.get('/teacher/list/', teacherRoutes.get_list);
  app.get('/teacher/doesExist/*', teacherRoutes.get_exists);
  app.get('/teacher/info/*', teacherRoutes.get_info);
  app.delete('/teacher/delete/', teacherRoutes.delete_teacher);

  // --------------------------------------------------------------------------

  app.post('/class/post_create/', classRoutes.post_create);
  app.get('/class/list/*', classRoutes.get_list);
  app.get('/class/info/*', classRoutes.get_info);
  app.delete('/class/delete/', classRoutes.delete_class);

  // --------------------------------------------------------------------------

  app.post('/student/register/', studentRoutes.post_create);
  app.post('/student/enroll/', studentRoutes.post_enroll);
  app.post('/student/unenroll/', studentRoutes.post_unenroll);
  app.get('/student/info/*', studentRoutes.get_info);
  app.get('/student/list/*', studentRoutes.get_students);
  app.delete('/student/delete/', studentRoutes.delete_student);

  // --------------------------------------------------------------------------

  app.post('/deck/create', deckRoutes.post_create);
  app.get('/deck/info/*', deckRoutes.get_info);
  app.get('/deck/list/*', deckRoutes.get_decks);
  app.delete('/deck/delete', deckRoutes.delete_deck);

  // --------------------------------------------------------------------------

  app.post('/card/create/', cardRoutes.post_create);
  app.post('/card/update/', cardRoutes.post_update);
  app.get('/card/info/*', cardRoutes.get_info);
  app.get('/card/list/*', cardRoutes.get_list);
  app.delete('/card/delete/', cardRoutes.delete_card);

  // --------------------------------------------------------------------------

  app.post('/session/create/', sessionRoutes.post_create);
  app.get('/session/info/*', sessionRoutes.get_info);
  app.get('/session/list/student/*', sessionRoutes.get_list_student);
  app.get('/session/list/deck/*', sessionRoutes.get_list_deck);
  app.delete('/session/delete', sessionRoutes.delete_session);
};