define(['backbone',
        'handlebars',
        'modules/model/startmenu',
        'text!../tpl/startmenu.html',
        'modules/view/icons',
        'modules/view/program'],
        function(Backbone,Handlebars,StartmenuModel,Template,Icons,Program){
    
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
            
            new Icons({
                el:'#all-programs > li',
                xid:'WfpW8xgTAh',
                class:'list-icons'
            });
        },
        
        bind: function() {
            $('#win-start-btn').on('click',function(){
                $('html').toggleClass('show-startmenu');
            });
        }
        
    });

    return Startmenu;
});