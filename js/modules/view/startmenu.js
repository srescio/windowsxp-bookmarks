define(['backbone',
        'handlebars',
        'modules/model/startmenu',
        'text!../tpl/startmenu.html',
        'modules/view/icons',
        'modules/view/program'],
        function(Backbone,Handlebars,StartmenuModel,Template,Icons,Program){
    
    var Startmenu = Backbone.View.extend({
        
        el : '#win-desktop',
        model : new StartmenuModel(),
        template: Handlebars.compile(Template),
        rightlinks : {},
        
        initialize: function() {
            this.render();
            this.bind();
            
            window.xp.on('startmenuClose',this.close);
        },
        
        render: function() {
            var _this = this;
            
            this.$el.prepend( this.template( this.model.toJSON() ) );
            this.rightlinks = this.$el.find('#stm-right a');
            this.rightlinks.each(function(e){
                $(this).attr('data-program-id',_this.programID() );
            });
            
            new Icons({
                el:'#stm-programs-list',
                xid:'u3d5tgcANe',
                isGrid: false
            });
        },
        
        bind: function() {
            var _this = this;
            
            $('#win-start-btn').on('click',function(){
                $('html').toggleClass('show-startmenu');
            });
            
            this.rightlinks.on('click',function(e){
                e.preventDefault();
                var programID = $(this).data('program-id');
                
                if( _this.programIsOpen(programID) ) {
                    _this.selectProgramAndHideMenu(programID);
                } else {
                    
                    new Program({
                        id      : programID,
                        name    : $(this).find('.stm-prg-name').text(),
                        url     : $(this).attr('href'),
                        hasIcon : 'true',
                        icon    : $(this).find('img').attr('src')
                    });
                    _this.selectProgramAndHideMenu(programID);
                    
                    if( $(this).attr('href')==='' ) {
                        var window = $('.desk-window.current .desk-window-content > div');
                        window.html('<ul class="win-icons grid-icons"></ul>');

                        new Icons({
                            el:'.desk-window[data-program-id="'+programID+'"] .win-icons',
                            xid:'JKgHG6drYg',
                            isGrid: true,
                            isDoc: true
                        });                    
                        
                    }
                    
                    
                }                
                
            });
        },
        
        close: function() {
            $('html').removeClass('show-startmenu');
        },
        
        programID : function() {
            var string = Math.random().toString(36).substring(2);
            return string;
        },

        programIsOpen: function(prgID){
            var prgID   = prgID;
            var program = $('.desk-window[data-program-id="'+prgID+'"],.win-bar-program[data-program-id="'+prgID+'"]');
                        
            return program.length;
        },
        
        selectProgramAndHideMenu: function(programID) {
            window.xp.trigger('startmenuClose');
            setTimeout(function(){
                window.xp.trigger('selectProgram',programID);
            },5);  
        }
        
    });

    return Startmenu;
});