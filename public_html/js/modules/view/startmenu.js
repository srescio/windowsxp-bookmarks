define(['backbone',
        'handlebars',
        'text!../tpl/startmenu.html'],
        function(Backbone,Handlebars,Template){
    
    var Startmenu = Backbone.View.extend({
        
        el : '#win-desktop',
        template: Handlebars.compile(Template),
        
        initialize: function() {
            this.render();
        },
        
        render: function() {
            this.$el.prepend( this.template() );
        }
        
    });

    return Startmenu;
});