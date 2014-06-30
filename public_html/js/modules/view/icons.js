define(['backbone',
        'handlebars',
        'modules/model/icons',
        'modules/view/xmarks',
        'text!../tpl/icons.html',
        'modules/view/program'],
        function(Backbone,Handlebars,IconsModel,xMarks,IconsTpl,Program){
    
    var Icons = Backbone.View.extend({
        
        el : '#win-desktop > .tbcRelative',
        model: new IconsModel(),
        iconsTpl: Handlebars.compile(IconsTpl),
        
        initialize: function(args) {            
            this.options = args;
            this.id = this.options.id;
            
            var xmarks = new xMarks();
                        
            var icons = Xmarks.Widget.create({
                "id":this.id,
                "v":1,
                "limit":900,
                "truncate":100,
                "hide_description" : true,
                "iconsObj":this
            });
            
            //Render will be called by the xMarks callback and call bind
        },
        
        programID : function() {
            var string = Math.random().toString(36).substring(2);
            return string;
        },

        render: function(icons) {
            var _this = this;
            console.warn(icons)
            var iconsArray = [];
            
            for(var property in icons) {   
                var url = icons[property].url;
                if(typeof url!=='undefined') {
                    var icon = {
                        id   : _this.programID(),
                        name : _this.programName(url),
                        icon : _this.favIcon(url),
                        desc : icons[property].name,
                        url  : icons[property].url
                    };
                    iconsArray.push(icon);
                }
            };
            
            this.model.set({icons:iconsArray});
            
            this.$el.append( this.iconsTpl( this.model.toJSON() ) );
            
            this.bind();
        },
        
        bind: function() {            
            var theIcons = this.$el.find('.win-icon a');
            
            theIcons.on('click',function(e){
                e.preventDefault();
                theIcons.removeClass('selected');
                $(this).addClass('selected');
            }).on('dblclick', function(e){
                var prgID = $(this).data('program-id');
                new Program({
                    id   : prgID,
                    name : $(this).find('.win-icon-name').text(),
                    url  : $(this).attr('href')
                });
            });
        },

        favIcon: function(url) {
            var faviconURL = url.replace(/^(http:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';            
            return faviconURL;
        },
        
        programName: function(url) {
            var    a      = document.createElement('a');
                   a.href = url;
            return a.hostname;
        }
        
    });

    return Icons;
});