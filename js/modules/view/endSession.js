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
            console.log(this.options);
            
            this.$el.append(this.template);
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