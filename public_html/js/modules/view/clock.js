define(['backbone',
        'handlebars',
        'text!../tpl/window.html'],
        function(Backbone,Handlebars,Template){
    
    var Clock = Backbone.View.extend({
        
        el : '#win-desktop',
        template: Handlebars.compile(Template),
        
        initialize: function() {
            this.render();
        },
        
        render: function() {
            this.$el.append( this.template() );
            
        }
        
    });

    return Clock;
});