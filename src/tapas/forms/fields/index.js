var sys = require('sys');
var widgets = require('tapas/forms/widgets');
var Class = require('tapas/utils/util').Class;

// base class for the fields
var Field = Class(
    {
        init: function(name, label, widget){
            this.name = name;
            this.label = label;
            this.auto_id =  'id_' + this.name;
            this.widget = widget;
            this.value = null;
            if(!this.label){
                this.label = this.name;
            }
            this.widget = new widget(this.name, this.label);
        },
        // renders widget
        render: function(){
            return this.widget.render();
        },

        // trasform the field into a javascript object
        to_javascript: function(){
            return this.value;
        },

        // returns the value of the field
        toString: function(){
            return "Field";
        },

        // validates the field
        validate: function(){
            return true;
        },

        // cleans the field
        clean: function(){
            return true;
        }
    });

var CharField = Field.extend(
    {
        init: function(name, label, widget){
            var field_widget = typeof(widget) != 'undefined' ? widget : widgets.TextWidget;
            this._field = 'CharField';
            this.__super__(name, label, field_widget);
        }
    }
);

var TextField = Field.extend(
    {
        init: function(name, label, widget){
            var field_widget = typeof(widget) != 'undefined' ? widget : widgets.TextAreaWidget;
            this._field = 'TextField';
            this.__super__(name, label, field_widget);
        }
    }
);

var fields = {};
fields.CharField = CharField;
fields.TextField = TextField;
module.exports = fields;