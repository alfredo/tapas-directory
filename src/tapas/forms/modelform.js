/*********************
 * Transforms the models into forms
***********************/
var sys = require('sys');
var template = require('tapas/template');
var widgets = require('tapas/forms/widgets');
var modelform = function(Model){
    // iterate fields and generate widgets
    // fields widgets should have a render method
    var form = {};
    var reserved_fields = ['_id'];
    // TODO: find a better way to introspect
    var modelinstance = new Model();
    //console.dir(modelinstance._partials);
    // generate widgets
    console.dir(modelinstance);
    for(field in modelinstance._partials){
        if(!field.match("^_")){
            form[field] = widgets.text(field);
        }
    }
    return form;
};
module.exports = modelform;
