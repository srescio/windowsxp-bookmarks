define(['backbone','handlebars','text!../tpl/welcome.html'],function(Backbone,Handlebars,Template){
    
    var Welcome = Backbone.View.extend({
        
        el : '#system',
        template: Handlebars.compile(Template),
        
        initialize: function() {
            this.render();
        },
        
        render: function() {
            
            this.$el.html( this.template() );
            var audio = new Audio('res/startup.mp3');
            
            setTimeout(function(){
                audio.play();
            },5000);
        }
        
    });

    return Welcome;
});