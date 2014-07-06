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
            
            window.xp.on('startmenuClose',this.close);
        },
        
        render: function() {
            this.$el.prepend( this.template( this.model.toJSON() ) );
            
            new Icons({
                el:'#stm-programs-list',
                xid:'WfpW8xgTAh',
                isGrid: false
            });
        },
        
        bind: function() {
            $('#win-start-btn').on('click',function(){
                $('html').toggleClass('show-startmenu');
            });
        },
        
        close: function() {
            $('html').removeClass('show-startmenu');
        }
        
    });

    return Startmenu;
});