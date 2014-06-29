define(['backbone',
        'handlebars',
        'modules/model/startmenu',
        'modules/view/xmarks',
        'text!../tpl/icons.html'],
        function(Backbone,Handlebars,IconsModel,xMarks,IconsTpl){
    
    var Icons = Backbone.View.extend({
        
        el : '#desktop',
        iconsTpl: Handlebars.compile(IconsTpl),
        
        initialize: function(args) {
            iconsModel = new IconsModel();
            
            this.options = args;
            this.id = this.options.id;
            
            var xmarks = new xMarks();
                        
            var icons = Xmarks.Widget.create({
                "id":this.id,
                "v":1,
                "limit":900,
                "truncate":100,
                "css": ".xmarks{ width:100%; }",
                "hide_description" : true,
                "iconsObj":this
            });
                        
//            this.render();
//            this.bind();
        },

        render: function() {
            var windows = this.$el.find('#win-desktop>.tbcRelative');
            var bar = this.$el.find('#wpl');
            
            // Deselect all current programs
            this.$el.find('.desk-window,.win-bar-program').removeClass('current');
            
            // Render new program as current
            var prgName = this.options.name;
            var prgUrl  = this.options.url;
            var prgID   = this.programID();
            var prgIcon = this.favIcon(prgUrl);
            
            windows.append(
                this.windowTpl({
                    ID  : prgID,
                    icon: prgIcon,
                    name: prgName,
                    url : prgUrl
                })
            );
            bar.append(
                this.barTpl({
                    ID  : prgID,
                    icon: prgIcon,
                    name: prgName
                })
            );
            
            this.id = prgID;
            this.program = $('[data-program-id="'+prgID+'"]');
            this.window  = $('article[data-program-id="'+prgID+'"]');
            this.traybar = $('li[data-program-id="'+prgID+'"]');
        },
        
        bind: function() {
            //var _this = this;
        },

        favIcon: function(url) {
            var faviconURL = url.replace(/^(http:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';            
            return faviconURL;
        },
        
        logIcons:function(icons) {
            console.warn('logging from bb obj',icons);
        }
        
    });

    return Icons;
});