define(['backbone',
        'handlebars',
        'text!../tpl/desktop.html',
        'modules/view/startmenu',
        'modules/view/clock',
        'modules/view/icons',
        'modules/view/program'],
        function(Backbone,Handlebars,deskTpl,Startmenu,Clock,Icons,Program){
    
    var Desktop = Backbone.View.extend({
        
        el : '#system',
        deskTpl: Handlebars.compile(deskTpl),
        
        initialize: function() {
            this.render();
            this.bind();
        },
        
        render: function() {
            this.$el.html( this.deskTpl() );
            var startmenu = new Startmenu();
            var clock = new Clock();
            
            var desktopIcons = new Icons({id:'u3d5tgcANe'});
            
//            var pippo = new Program({
//                icon : 'img/mydocs.png',
//                name : 'Ansa',
//                url  : 'http://ansa.it'
//            });
//            var sr = new Program({
//                icon : 'img/mydocs.png',
//                name : 'SimoneRescio.it',
//                url  : 'http://simonerescio.it'
//            });
        },
        
        bind: function() {
            // Deselect program and/or hide startmenu
            $('body').on('click', function(e){
                if( !$(e.target).parents('#startmenu').length && e.target.id!=="win-start-btn" ) {
                    $('html').removeClass('show-startmenu');
                }
                if( !$(e.target).parents('.win-icon').length ) {
                    
                    $('.win-icon a').removeClass('selected');
                    $('.win-icon').removeClass('ui-selected');
                }
                if( !$(e.target).parents('.desk-window,.win-bar-program').length ) {
                    $('.desk-window,.win-bar-program').removeClass('current');
                }
            }).on('keypress',function(e){
                if(e.keyCode===13) {
                    $('.win-icon.ui-selected').each(function(){
                        console.log('executed LI each')
                        new Program({
                            id   : $(this).find('a').data('program-id'),
                            name : $(this).find('.win-icon-name').text(),
                            url  : $(this).find('a').attr('href')
                        });
                    })
                    $('.win-icon a.selected').each(function(){
                        console.log('executed A each')
                        new Program({
                            id   : $(this).data('program-id'),
                            name : $(this).find('.win-icon-name').text(),
                            url  : $(this).attr('href')
                        });
                    })
                }
            });
        }
        
    });

    return Desktop;
});