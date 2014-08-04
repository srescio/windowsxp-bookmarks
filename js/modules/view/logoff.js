define(['backbone',
        'handlebars',
        'text!../tpl/preSystem.html',
        'text!../tpl/shutdown.html',
        'text!../tpl/poweroff.html',],
        function(Backbone,Handlebars,PreSystemTpl,ShutdownTpl,PoweroffTpl){
    
    var Logoff = Backbone.View.extend({
        
        el : '#system',
        action: '',
        preSystemTpl: Handlebars.compile(PreSystemTpl),
        logoffTpl: Handlebars.compile(ShutdownTpl),
        
        initialize: function(options) {
            var _this = this;
            this.action = options.action;
            
            console.info('logoff inited! action:',this.action)
            
            setTimeout(function(){
                window.xp.trigger('shutdown');
            },200);
            
            setTimeout(function(){
                _this.$el.find('#win-desktop .win-icons').remove();
            },1000);
            
            setTimeout(function(){
                _this.render();
            },1400);
        },
        
        render: function() {
            var _this = this;
            
            this.$el.html( this.preSystemTpl( {contents: this.logoffTpl} ) );
            
            var shutdownMessage = this.$el.find('#shutdown-messagge');
            
            //IE8 will throw JS error and stop here otherwise
            if(typeof Audio!=='undefined') {
                window.xp.shutdownSound.play();
            }
            
            this.doShutdown = function(){
                (_this.options.action==='poweroff')?_this.poweroff():_this.restart();
            };
            
            //Animate shutdown message
            setTimeout(function(){
                shutdownMessage.text('Saving your settings...');
            },2000);
            setTimeout(function(){
                shutdownMessage.text('Windows is shutting down...');
            },2600);
            setTimeout(function(){
                _this.doShutdown();
            },6300);             
        },
        
        switchUser: function() {
            this.$el.html( this.poweroffTpl );
        },
        
        logoff: function() {
            location.reload();
        }
    });

    return Logoff;
});