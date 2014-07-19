define(['backbone',
        'handlebars',
        'modules/view/shutdown',
        'text!../tpl/endSession.html'],
        function(Backbone,Handlebars,Shutdown,Template){
    
    var EndSession = Backbone.View.extend({
        
        el : '#system',
        template: Handlebars.compile(Template),
        modal: {},
        cancel: {},
        
        initialize: function(options) {
            var _this = this;
            
            window.xp.trigger('startmenuClose');
            window.xp.on('shutdown',function(){_this.removeModal()});
            
            this.options = options;
            this.render();
        },
        
        render: function() {
            this.logoff = {
                title:'Disconnessione da Windows',
                buttons:[
                    {
                        action:'switch',
                        color:'btn-green',
                        text:'Switch user',
                        status:'es-disabled'
                    },
                    {
                        action:'logoff',
                        color:'btn-yellow',
                        text:'Disconnect'
                    }
                ]
            };
            this.poweroff = {
                title:'Spegni il computer',
                buttons:[
                    {
                        action:'standby',
                        color:'btn-yellow',
                        text:'Stand by',
                        status:'es-disabled'
                    },
                    {
                        action:'off',
                        color:'btn-red',
                        text:'Spegni'
                    },
                    {
                        action:'restart',
                        color:'btn-green',
                        text:'Riavvia'
                    }
                ]                
            };
            this.action = {};
            
            (this.options.action==='logoff')?
            this.action=this.logoff : this.action=this.poweroff;
            
            this.$el.append(this.template(this.action));
            this.$el.addClass('end-session-show');
            
            this.modal  = this.$el.find('.end-session');
            this.cancel = this.modal.find('.esb-cancel');
            
            this.bind();
            //Bind events relevant to current action
            (this.options.action==='logoff')?this.bindLogoff():this.bindPoweroff();
        },
        
        bind: function() {
            var _this = this;
            this.cancel.on('click',function(){
                _this.removeModal();
            });
        },
        
        bindLogoff: function() {
            
        },

        bindPoweroff: function() {
            this.modal.find('#es-off').on('click',function(){
                new Shutdown({action:'poweroff'});
            });
            this.modal.find('#es-restart').on('click',function(){
                new Shutdown({action:'restart'});
            });            
        },
                
        removeModal : function() {
            this.modal.remove();
            this.$el.removeClass('end-session-show');
        }
        
    });

    return EndSession;
});