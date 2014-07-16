define(['backbone',
        'handlebars',
        'text!../tpl/endSession.html'],
        function(Backbone,Handlebars,Template){
    
    var EndSession = Backbone.View.extend({
        
        el : '#system',
        template: Handlebars.compile(Template),
        modal: {},
        cancel: {},
        
        initialize: function(options) {
            window.xp.trigger('startmenuClose');
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
        },
        
        bind: function() {
            var _this = this;
            this.cancel.on('click',function(){
                _this.removeModal();
            });
        },
        
        removeModal : function() {
            this.modal.remove();
            this.$el.removeClass('end-session-show');
        }
        
    });

    return EndSession;
});