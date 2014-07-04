define(['backbone',
        'handlebars',
        'modules/model/icons',
        'modules/view/xmarks',
        'text!../tpl/icons.html',
        'modules/view/program'],
        function(Backbone,Handlebars,IconsModel,xMarks,IconsTpl,Program){
    
    var Icons = Backbone.View.extend({
        
        el : '',
        model: new IconsModel(),
        iconsTpl: Handlebars.compile(IconsTpl),
        missing: [],
        
        initialize: function(args) {            
            this.options = args;
            this.xid = this.options.xid;
            this.el = this.options.el;
            this.class = this.options.class;
            
            console.log(this.$el[0]);
            
            new xMarks();
                        
            Xmarks.Widget.create({
                "id":this.xid,
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
            var iconsArray = [];
            
            for(var property in icons) {   
                var url = icons[property].url;
                if(typeof url!=='undefined') {
                    
                    var programID = this.programID();
                    
                    _this.checkImg( _this.favIcon(url) , programID );
                    
                    var icon = {
                        id   : programID,
                        name : _this.programName(url),
                        icon : _this.favIcon(url),
                        desc : icons[property].name,
                        url  : icons[property].url
                    };
                    iconsArray.push(icon);
                }
            };
            
            this.model.set({icons:iconsArray,class:this.class});
            
            this.$el.append( this.iconsTpl( this.model.toJSON() ) );
            
            this.bind();
        },
        
        bind: function() {            
            var _this = this;
            var theIcons = this.$el.find('.win-icon a');
            
            theIcons.on('click',function(e){
                e.preventDefault();
                theIcons.removeClass('selected');
                $('.win-icon').removeClass('ui-selected');
                $(this).addClass('selected');
            }).on('dblclick', function(e){
                var prgID = $(this).data('program-id');
                var hasIcon = _this.missing.indexOf(prgID) === -1;
                hasIcon = (hasIcon===true)?'true':'false';
                
                new Program({
                    id      : prgID,
                    name    : $(this).find('.win-icon-name').text(),
                    url     : $(this).attr('href'),
                    hasIcon : hasIcon
                });
            });
            
            //Wait to have error callbacks populate the array
            this.interval = setInterval(function(){_this.markNoIcons()},500);
            this.stopInterval = setTimeout(function(){clearInterval(_this.interval)},15000);
            
            this.$el.find('.win-icons').selectable({cancel:'a',distance: 5});
        },

        favIcon: function(url) {
            var faviconURL = url.replace(/^(http:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';
            return faviconURL;
        },
        
        checkImg: function(url,id) {
            var _this = this;
            
            var img = new Image();

            img.onerror = function() {
                _this.missing.push(id);
            };

            img.src = url;
        },
        
        markNoIcons:function(){
            var _this = this;
            for (var id in _this.missing) {

                this.$el.find('.win-icons [data-program-id="'+_this.missing[id]+'"] .win-icon-image')
                        .attr('data-has-icon','false');
            }                
        },
        
        programName: function(url) {
            var    a      = document.createElement('a');
                   a.href = url;
            return a.hostname;
        }
        
    });

    return Icons;
});