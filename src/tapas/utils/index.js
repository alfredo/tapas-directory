var Mu = require('mu');
var sys = require('sys');
var settings = require('settings');
Mu.templateRoot = settings.template_dir;

var utils = {
    censor: function(key, value){
        // TODO: remove sensitive fields
        var sensitive_fields = ['_id'];
        if(key in sensitive_fields){
            return undefined;
        }
        return value;
    },
    render_as_json: function(object, callback){
        var callback_method = typeof(callback) != 'undefined' ? callback_method : utils.censor;
        var result = object;
        if(object instanceof Array){
            var json_string = "\[";
            var i = 0;
            object.forEach(
                function(item){
                    json_string += JSON.stringify(item, callback_method);
                    if(i != object.length-1){
                        json_string += ',';
                    }
                    i++;
                });
            json_string += "\]";
        }else{
            var json_string = JSON.stringify(result, callback_method);
        }
        var json_object = JSON.parse(json_string);
        return unescape(json_object);
    }
};
module.exports = utils;