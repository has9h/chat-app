module.exports = function(app){
    var user = require('./../controllers/user_controller.js');
    
    app.get('/', user.new);
    
    app.post('/user/create', user.create);
    
    app.get('/user/list', user.list);
    
}