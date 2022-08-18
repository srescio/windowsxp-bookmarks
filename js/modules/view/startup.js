define(['backbone','handlebars', 'howler', 'text!../tpl/startup.html'],function(Backbone,Handlebars,Howler,Template){
    
    var Startup = Backbone.View.extend({
        
        el : '#system',
        template: Handlebars.compile(Template),
        
        initialize: function() {
            this.preload();
            this.render();
        },
        
        render: function() {
            this.$el.html( this.template() );
        },
        
        preload: function(){
            //IE8 will throw JS error and stop here otherwise
            if(typeof Audio!=='undefined') {
                window.xp.startupSound = new Howl({ src: ['res/startup.mp3'] });
                window.xp.shutdownSound = new Howl({ src: ['res/shutdown.mp3'] })
            }
        }
        
    });

    return Startup;
});