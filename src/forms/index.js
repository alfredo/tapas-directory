var modelform = require('tapas/forms/modelform');
var widgets = require('tapas/forms/widgets');
var fields = require('tapas/forms/fields');
var User = require('models/user');

var forms = {};
forms.User = function(){
    var user_options = {
        username: {
            field: fields.CharField
        },
        address: {
            field: fields.TextField
        }
    };
    return modelform(User, user_options);
};
module.exports = forms;