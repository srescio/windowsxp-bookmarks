define(['backbone',
        'handlebars',
        'modules/model/icon',
        'modules/view/xmarks',
        'text!../tpl/icon.html',
        'modules/view/program'],
        function(Backbone,Handlebars,IconModel,xMarks,IconTpl,Program){
    
    var Icons = Backbone.View.extend({
        
        el : '',
        template: Handlebars.compile(IconTpl),
        missing: [],
        isGrid: null,
        
        initialize: function(args) {            
            this.options = args;
            this.xid = this.options.xid;
            this.el = this.options.el;
            this.isGrid = this.options.isGrid;
                        
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

        render: function(bookmarks) {            
            for(var fav in bookmarks) {   
                if(typeof bookmarks[fav].url!=='undefined') {
                    //Url is defined, check if can be loaded in iFrame
                    this.testIframe(bookmarks[fav].url,bookmarks[fav].name);
                }
            };                                    
        },
        
        bind: function(programID) {
            var iconEl = (this.isGrid)?
                         this.$el.find('[data-program-id="'+programID+'"]'):
                         this.$el.find('[data-program-id="'+programID+'"]').parent();
            (this.isGrid)?this.gridEvents(iconEl):this.listEvents(iconEl);
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
                
                var missingEl = _this.$el.find('[data-program-id="'+id+'"] .win-icon-image')
                missingEl.attr('data-has-icon','false');
            };

            img.src = url;
        },
        
        testIframe: function(siteUrl,favName) {
            var _this = this;
            
            $.ajax({
                url: 'http://localhost/windowsxp/checkIframe.php',
                type: 'GET',
                data: { url: siteUrl} ,
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var response = JSON.parse(data);
                    
                    if(response['error']===false) {
                        _this.renderIcon(siteUrl,favName);
                    } else {
                        console.error('Url cannot be included in frame due to Cross Domain settings',response.url);
                    }
                }
            }); 
        },
        
        renderIcon: function(siteUrl,favName) {
            var programID = this.programID();

            var icon = {
                id   : programID,
                name : this.programName(siteUrl),
                icon : this.favIcon(siteUrl),
                desc : favName,
                url  : siteUrl
            };

            var model = new IconModel({icon:icon});

            this.$el.append( this.template( model.toJSON() ) );

            this.checkImg( this.favIcon(siteUrl) , programID );
            
            this.bind(programID);
        },
        
        gridEvents: function(iconEl) {
            var _this = this;
            
            this.theIcons = this.$el.find('.win-icon a');
            
            iconEl.on('click',function(e){
                e.preventDefault();
                _this.theIcons.removeClass('selected');
                _this.$el.find('.win-icon').removeClass('ui-selected');
                $(this).addClass('selected');
            }).on('dblclick', function(){
                var prgID = $(this).data('program-id');
                
                if( _this.programIsOpen(prgID) ) {
                    window.xp.trigger('selectProgram',prgID);
                } else {
                    _this.newProgram(this);
                }
            });
            
            this.$el.selectable({cancel:'a',distance: 5});
        },
        
        listEvents: function(iconEl) {
            var _this = this;
            
            this.theIcons = this.$el.find('.win-icon');
            
            iconEl.on('click',function(e){
                e.preventDefault();

                var link = $(this).find('a');
                
                var prgID = link.data('program-id');
                
                if( _this.programIsOpen(prgID) ) {
                    window.xp.trigger('selectProgram',prgID);
                    window.xp.trigger('startmenuClose');
                } else {
                    window.xp.trigger('startmenuClose');
                    _this.newProgram(link);
                }
            });
        },
        
        programName: function(url) {
            var    a      = document.createElement('a');
                   a.href = url;
            return a.hostname.replace('www.','');
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
        },
        
        programIsOpen: function(prgID){
            var prgID   = prgID;
            var program = $('.desk-window[data-program-id="'+prgID+'"],.win-bar-program[data-program-id="'+prgID+'"]');
                        
            return program.length;
        }
        
    });

    return Icons;
});