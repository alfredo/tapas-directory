/*********************
 * Transforms the models into forms
***********************/
var sys = require('sys');
var template = require('tapas/template');
var fields = require('tapas/forms/fields');
// generate a form from the model
var modelform = function(Model, form_definition){
    var form = {};
    // TODO: find a better way to introspect mongoose models
    var modelinstance = new Model();
    for(field in modelinstance._partials){
        // hide private fields
        if(!field.match("^_")){
            if(field in form_definition){
                form[field] = new form_definition[field].field(field);
            }else{
                form[field] = new fields.CharField(field);
            }
        }
    }
    return form;
};
module.exports = modelform;
