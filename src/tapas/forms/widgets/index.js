

// simple wrapper to return a render method
function render_generator(text){
    var render ={
        render: function(){
            return text;
        }
    };
    return render;
}

var widgets = {
    text: function(name){
        var text = '<input type="text" id="id_'+ name +'" name="'+ name +'">';
        var widget = render_generator(text);
        widget.auto_id = "id_" + name;
        widget.label = name;
        return widget;
    },
    textarea: function(name){
        var text = '<textarea id="id_'+ name +'" name="'+ name +'"></textarea>';
        var widget = render_generator(text);
        widget.auto_id = "id_" + name;
        widget.label = name;
        return widget;
    }
};
module.exports = widgets;