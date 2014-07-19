define(['backbone','handlebars','text!../tpl/preSystem.html'],function(Backbone,Handlebars,Template){
    
    var Welcome = Backbone.View.extend({
        
        el : '#system',
        template: Handlebars.compile(Template),
        
        initialize: function() {
            this.render();
        },
        
        render: function() {
            var html = '<h1 id="welcome-message">welcome</h1>';
            
            this.$el.html( this.template( {contents:html}) );
            
            //IE8 will throw JS error and stop here otherwise
            if(typeof Audio!=='undefined') {
                setTimeout(function(){
                    window.xp.startupSound.play();
                },5000);
            }
        }
        
    });

    return Welcome;
});