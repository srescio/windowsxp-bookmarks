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
            new Startmenu();
            new Clock();
            
            new Icons({
                el:'#win-desktop-icons',
                xid:'u3d5tgcANe',
                isGrid: true
            });
        },
        
        bind: function() {
            var _this = this;
            // Deselect program and/or hide startmenu
            $('body').on('click', function(e){
                if( !$(e.target).parents('#startmenu').length && e.target.id!=="win-start-btn" ) {
                    $('html').removeClass('show-startmenu');
                }
                if( !$(e.target).parents('.win-icon').length ) {
                    $('.win-icon a').removeClass('selected');
                    $('.win-icon').removeClass('ui-selected');
                }
                if( !$(e.target).parents('.desk-window,.win-bar-program,.win-icons').length ) {
                    $('.desk-window,.win-bar-program').removeClass('current');
                }
            }).on('keydown',function(e){
                
                if(e.keyCode===13) {
                    
                    $('.win-icon.ui-selected').each(function(){
                        var prgID = $(this).find('a').data('program-id');
                        
                        if( _this.programIsOpen(prgID) ) {
                            window.xp.trigger('selectProgram',prgID);
                        } else {
                            new Program({
                                id      : prgID,
                                name    : $(this).find('.win-icon-name').text(),
                                url     : $(this).find('a').attr('href'),
                                hasIcon : _this.hasIcon(this)
                            });
                        }

                    });
                    $('.win-icon a.selected').each(function(){
                        var prgID = $(this).data('program-id');
                        
                        if( _this.programIsOpen(prgID) ) {
                            window.xp.trigger('selectProgram',prgID);
                        } else {
                            new Program({
                                id      : prgID,
                                name    : $(this).find('.win-icon-name').text(),
                                url     : $(this).attr('href'),
                                hasIcon : _this.hasIcon(this)
                            });
                        }
                    });
                }
            });
        },
        
        hasIcon : function(scope) {
            var hasIcon = $(scope).find('.win-icon-image').data('has-icon');
            hasIcon = (hasIcon)?'true':'false';
            return hasIcon;
        },
        
        newProgram: function(id,name,url) {
            new Program({
                id   : id,
                name : name,
                url  : url
            });            
        },

        programIsOpen: function(prgID){
            var prgID   = prgID;
            var program = $('.desk-window[data-program-id="'+prgID+'"],.win-bar-program[data-program-id="'+prgID+'"]');
                        
            return program.length;
        }        
        
    });

    return Desktop;
});