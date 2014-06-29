define(['backbone',
        'handlebars',
        'modules/model/startmenu',
        'text!../tpl/startmenu.html'],
        function(Backbone,Handlebars,StartmenuModel,Template){
    
    var Startmenu = Backbone.View.extend({
        
        el : '#win-desktop',
        model : new StartmenuModel(),
        template: Handlebars.compile(Template),
        
        initialize: function() {
            this.render();
            this.bind();
        },
        
        render: function() {
            this.$el.prepend( this.template( this.model.toJSON() ) );
        },
        
        bind: function() {
            $('#win-start-btn').on('click',function(){
                $('html').toggleClass('show-startmenu');
            });
        }
        
    });

    return Startmenu;
});