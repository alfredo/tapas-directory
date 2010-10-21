var modelform = require('tapas/forms/modelform');
var User = require('models/user');

var forms = {};
forms.user = modelform(User);
module.exports = forms;