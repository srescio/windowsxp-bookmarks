define(['backbone','handlebars','text!../tpl/startup.html'],function(Backbone,Handlebars,Template){
    
    var Startup = Backbone.View.extend({
        
        el : '#system',
        template: Handlebars.compile(Template),
        
        initialize: function() {
            this.render();
        },
        
        render: function() {
            
            this.$el.html( this.template() );
        }
        
    });

    return Startup;
});