define(['backbone',
        'handlebars',
        'text!../tpl/desktop.html',
        'modules/view/startmenu',
        'modules/view/clock'],
        function(Backbone,Handlebars,deskTpl,Startmenu,Clock){
    
    var Desktop = Backbone.View.extend({
        
        el : '#system',
        template: Handlebars.compile(deskTpl),
        
        initialize: function() {
            this.render();
        },
        
        render: function() {
            
            this.$el.html( this.template() );
            var clock = new Clock();
            var startmenu = new Startmenu();
            
            $('.desk-window').draggable();
            
            //Window resize methods
            $('.win-cmd-resize').on('click', function(e){
                $(this).parents('.desk-window').toggleClass('magnified');
            });
            $('.desk-window-title').on('dblclick', function(e){
                var windowObj = $(this).parents('.desk-window');
                
                if ( windowObj.hasClass('resizable') ) {
                    windowObj.toggleClass('magnified');
                };                        
            });
            
            //Program Close methods
            $('.win-cmd-close').on('click', function(e){
                $(this).parents('.desk-window').remove();
            });
            $('.program-icon').on('dblclick', function(e){
                $(this).parents('.desk-window').remove();
            });
            
        }
        
    });

    return Desktop;
});