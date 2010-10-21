/***********************
 * Functions related to templates
**********************/

var Mu = require('mu');
var sys = require('sys');
var settings = require('settings');
Mu.templateRoot = settings.template_dir;

var template = {
    render_to_string: function(template, dictionary){
        return Mu.render(template, dictionary,
                         function(err, output){
                             if(err){
                                 throw err;
                             }
                             return output;
                         }
                        );
    }
};
module.exports = template;