define(['backbone',
        'handlebars',
        'modules/model/startmenu',
        'text!../tpl/startmenu.html',
        'modules/view/icons',
        'modules/view/program',
        'modules/view/endSession'],
        function(Backbone,Handlebars,StartmenuModel,Template,Icons,Program,EndSession){
    
    var Startmenu = Backbone.View.extend({
        
        el : '#win-desktop',
        options: {},
        model : {},
        template: Handlebars.compile(Template),
        rightlinks : {},
        
        initialize: function(options) {
            this.options = options;
            
            this.render();
            this.bind();
            
            window.xp.on('startmenuClose',this.close);
        },
        
        render: function() {
            var _this = this;
            
            var social = [];
            
            for(var network in this.options.social) {
                var name;
                
                switch(network) {
                    case 'github'   : name = 'Source'; break;
                    case 'codepen'  : name = 'Demos'; break;
                    case 'twitter'  : name = 'Tweets'; break;
                    case 'linkedin' : name = 'Curriculum Vitae'; break;
                }
                
                var link = {
                    href : this.options.social[network],
                    src  : 'img/'+network+'.png',
                    name : name,
                    desc : this.hostName(this.options.social[network])
                };
                social.push(link);
            }
            
            //Populate model with given data and add hostnames
            this.model = new StartmenuModel({
                user    : this.options.user,
                social  : social
            });
                        
            //Render startmenu
            this.$el.prepend( this.template( this.model.toJSON() ) );
            
            //Save reference to render elements and bind events
            this.rightlinks = this.$el.find('#stm-right a');
            this.rightlinks.each(function(e){
                $(this).attr('data-program-id',_this.programID() );
            });
            
            new Icons({
                el      :'#stm-programs-list',
                data    : this.options.bookmarks.startmenu,
                isGrid  : false
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
                            el      :'.desk-window[data-program-id="'+programID+'"] .win-icons',
                            data    :_this.options.bookmarks.documents,
                            isGrid  : true,
                            isDoc   : true
                        });
                    }
                }
            });
            
            //manage end of session buttons
            this.$el.find('#logoff').on('click',function(){
                new EndSession({action:'logoff'});
            });
            this.$el.find('#poweroff').on('click',function(){
                new EndSession({action:'poweroff'});
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
        },
        
        hostName: function(url) {
            var    protocol = new RegExp("http(s|)://");
            return url.replace(protocol,'').replace('www.','');
        }
        
    });

    return Startmenu;
});