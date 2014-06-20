define(['backbone',
        'handlebars',
        'text!../tpl/desktop.html',
        'modules/view/clock'],
        function(Backbone,Handlebars,deskTpl,Clock){
    
    var Desktop = Backbone.View.extend({
        
        el : '#system',
        template: Handlebars.compile(deskTpl),
        
        initialize: function() {
            this.render();
        },
        
        render: function() {
            
            this.$el.html( this.template() );
            setTimeout(function(){
                var clock = new Clock();
                
            },2000)
            
        }
        
    });

    return Desktop;
});