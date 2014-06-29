define(['backbone',
        'handlebars',
        'text!../tpl/desktop.html',
        'modules/view/startmenu',
        'modules/view/clock',
        'modules/view/program'],
        function(Backbone,Handlebars,deskTpl,Startmenu,Clock,Program){
    
    var Desktop = Backbone.View.extend({
        
        el : '#system',
        template: Handlebars.compile(deskTpl),
        
        initialize: function() {
            this.render();
            this.bind();
        },
        
        render: function() {
            this.$el.html( this.template() );
            var startmenu = new Startmenu();            
            var clock = new Clock();
            var pippo = new Program({
                icon : 'img/mydocs.png',
                name : 'Ansa',
                url  : 'http://ansa.it'
            });
            var sr = new Program({
                icon : 'img/mydocs.png',
                name : 'SimoneRescio.it',
                url  : 'http://simonerescio.it'
            });
        },
        
        bind: function() {
            // Deselect program and/or hide startmenu
            $('body').on('click', function(e){
                if( !$(e.target).parents('#startmenu').length && e.target.id!=="win-start-btn" ) {
                    $('html').removeClass('show-startmenu');
                }
                if( !$(e.target).parents('.desk-window,.win-bar-program').length )
                    $('.desk-window,.win-bar-program').removeClass('current');
            });
        }
        
    });

    return Desktop;
});