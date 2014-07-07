define(['backbone',
        'handlebars',
        'text!../tpl/window.html',
        'text!../tpl/bar.html'],
        function(Backbone,Handlebars,WindowTpl,BarTpl){
    
    var Program = Backbone.View.extend({
        
        el : '#desktop',
        windowTpl: Handlebars.compile(WindowTpl),
        barTpl   : Handlebars.compile(BarTpl),
        id:'',
        program: {},
        window : {},
        traybar : {},
        
        initialize: function(args) {
            var _this = this;
            this.options = args;
            this.render();
            this.bind();
            
            window.xp.on('selectProgram',function(id){_this.checkCurrent(id)});
        },
        
        render: function() {
            var windows = this.$el.find('#win-desktop>.tbcRelative');
            var bar = this.$el.find('#wpl');
            
            // Deselect all current programs
            this.$el.find('.desk-window,.win-bar-program').removeClass('current');
            
            // Render new program as current
            var prgName = this.options.name;
            var prgUrl  = this.options.url;
            var prgID   = this.options.id;
            var hasIcon = this.options.hasIcon;
            var prgIcon = this.favIcon(prgUrl);
            
            windows.append(
                this.windowTpl({
                    ID      : prgID,
                    icon    : prgIcon,
                    name    : prgName,
                    url     : prgUrl,
                    hasIcon : hasIcon
                })
            );
            bar.append(
                this.barTpl({
                    ID      : prgID,
                    icon    : prgIcon,
                    name    : prgName,
                    hasIcon : hasIcon
                })
            );
            
            this.id = prgID;
            this.window  = $('.desk-window[data-program-id="'+prgID+'"]');
            this.traybar = $('.win-bar-program[data-program-id="'+prgID+'"]');
            this.program = $('.desk-window[data-program-id="'+prgID+'"],.win-bar-program[data-program-id="'+prgID+'"]');
            
            var windowsNumber = $('article[data-program-id]').length;
            
            this.window.css({
                left:(20*windowsNumber)+'px',
                top:(20*windowsNumber)+'px'
            });
        },
        
        bind: function() {
            var _this = this;
            
            this.window.draggable().resizable();
            
            //Set the current program on click
            this.window.on('mousedown', function(e){                
                if( !$(e.target).hasClass('win-cmd-min') )
                _this.setCurrent();
            });
            
            //If program is current minimize, otherwise set current
            this.traybar.on('click', function(e){
                if( !$(this).hasClass('current') ) {
                    _this.setCurrent();
                } else {
                    _this.minimizeWindow();
                }
            }); 
            
            //Window reduce to tray
            this.window.find('.win-cmd-min').on('click',function(){
                _this.minimizeWindow();
            });
            
            //Window resize
            this.window.find('.win-cmd-resize').on('click', function(e){
                _this.resizeWindow();
            });
            this.window.find('.desk-window-title').on('dblclick', function(e){
                
                if ( _this.window.hasClass('resizable') ) {
                    _this.resizeWindow();
                };                        
            });
            
            //Program Close methods
            this.window.find('.win-cmd-close').on('click', function(e){
                _this.closeProgram();
            });
            this.window.find('.win-prg-icon').on('dblclick', function(e){
                _this.closeProgram();
            });
            
            this.trackIframe();
        },
        
        minimizeWindow : function() {
            this.program
                    .addClass('minimized')
                    .removeClass('current');
        },
        
        resizeWindow : function() {
            this.window.toggleClass('magnified');
        },
        
        checkCurrent: function(id) {
            if(this.id===id) this.setCurrent();
        },
        
        setCurrent : function() {
            $('[data-program-id]').removeClass('current');
            this.program
                    .removeClass('minimized')
                    .addClass('current');
        },
        
        closeProgram: function() {
            this.program.remove();
        },
        
        trackIframe : function() {
            var _this = this;
            
            this.window.find('iframe').iframeTracker({
                blurCallback: function(){
                    $('html').removeClass('show-startmenu');
                    _this.setCurrent();
                }
            });
        },
        
        favIcon: function(url) {
            var faviconURL = url.replace(/^(http:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';            
            return faviconURL;
        }
        
    });

    return Program;
});