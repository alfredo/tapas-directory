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
                var widget = form_definition[field].widget;
                var label = form_definition[field].label;
                // sys.print(widget);
                form[field] = new form_definition[field].field(field,
                                                               label,
                                                               widget);
            }else{
                form[field] = new fields.CharField(field, field);
            }
        }
    }
    return form;
};
module.exports = modelform;
