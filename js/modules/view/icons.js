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
        isGrid: null,
        
        initialize: function(args) {            
            this.options = args;
            this.xid = this.options.xid;
            this.el = this.options.el;
            this.isGrid = this.options.isGrid;
            this.class = (this.isGrid)?'grid-icons':'list-icons';
                        
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
            
            //Wait to have error callbacks populate the array
            this.interval = setInterval(function(){_this.markNoIcons()},500);
            this.stopInterval = setTimeout(function(){clearInterval(_this.interval)},15000);
            
            this.bind();
        },
        
        bind: function() {            
            this.theIcons = this.$el.find('.win-icon a');
            (this.isGrid)?this.gridEvents():this.listEvents();
        },
        
        gridEvents: function() {
            var _this = this;
            
            this.theIcons = this.$el.find('.win-icon a');
            
            this.theIcons.on('click',function(e){
                e.preventDefault();
                _this.theIcons.removeClass('selected');
                _this.$el.find('.win-icon').removeClass('ui-selected');
                $(this).addClass('selected');
            }).on('dblclick', function(){
                _this.newProgram(this);
            });
            
            this.$el.find('.win-icons').selectable({cancel:'a',distance: 5});
        },
        
        listEvents: function() {
            var _this = this;
            
            this.theIcons = this.$el.find('.win-icon');
            
            this.$el.find('.win-icon a').on('click',function(e){
                e.preventDefault();
            });
            
            this.theIcons.on('click',function(){
                var link = $(this).find('a');
                
                window.xp.trigger('startmenuClose');
                _this.newProgram(link);
            });
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
        },

        newProgram: function(scope){
            var prgID = $(scope).data('program-id');
            var hasIcon = this.missing.indexOf(prgID) === -1;
            hasIcon = (hasIcon===true)?'true':'false';

            var url = $(scope).attr('href');

            new Program({
                id      : prgID,
                name    : $(scope).find('.win-icon-name').text(),
                url     : url,
                hasIcon : hasIcon
            });
            
            this.testIframe(url);
        },
        
        testIframe: function(siteUrl) {
            $.ajax({
                url: 'http://localhost/sresc.io/winxptest/checkIframe.php',
                type: 'GET',
                data: { url: siteUrl} ,
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    console.info('success',response);
                },
                error: function (e) {
                    console.error('error',e);
                }
            }); 
            
        }
        
    });

    return Icons;
});