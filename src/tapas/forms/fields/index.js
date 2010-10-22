var sys = require('sys');
var widgets = require('tapas/forms/widgets');
var Class = require('tapas/utils/util').Class;

// base class for the fields
var Field = Class(
    {
        init: function(name, label){
            this.name = name;
            this.label = label;
            this.auto_id =  'id_' + this.name;
            if(!this.label){
                this.label = this.name;
            }
            this.value = null;
            this.widget = new widgets.TextWidget(this.name,
                                                 this.label);
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
        init: function(name, label){
            this.__super__(name, label);
            this.widget = new widgets.TextWidget(this.name,
                                                 this.label);
            this._field = 'CharField';
        }
    }
);

var TextField = Field.extend(
    {
        init: function(name, label){
            this.__super__(name, label);
            this.widget = new widgets.TextAreaWidget(this.name,
                                                    this.label);
            this._field = 'TextField';
        }
    }
);

var fields = {};
fields.CharField = CharField;
fields.TextField = TextField;
module.exports = fields;