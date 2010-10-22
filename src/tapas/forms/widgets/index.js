/*
 * Widgets for the form
 * */
var Class = require('tapas/utils/util').Class;
var Widget = Class(
    {
        init: function(name, label){
            this.name = name;
            this.label = label;
            this.auto_id =  'id_' + this.name;
            if(!this.label){
                this.label = this.name;
            }
        },
        render: function(){}
    });

var TextWidget = this.TextWidget = Widget.extend(
    {
        render: function(){
            var text = '<input type="text" id="'+
                this.auto_id +
                '" name="'+
                this.name +'">';
            return text;
        }
    }
);

var TextAreaWidget = this.TextAreaWidget = Widget.extend(
    {
        render: function(){
            var text = '<textarea id="'+
                this.auto_id +
                '" name="'+
                this.name +'"></textarea>';
            return text;
        }
    }
);

var widgets = {};
widgets.TextWidget = TextWidget;
widgets.TextAreaWidget = TextAreaWidget;
module.exports = widgets;