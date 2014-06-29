define(['backbone'],function(Backbone){
    var IconsModel = Backbone.Model.extend({
        defaults : {
                user: {
                    avatar :'http://1.gravatar.com/avatar/5c355fca7ea345a83e30cdc129df4aae?s=48&amp;d=retro&amp;r=G',
                    username:'Simone Rescio'
                }
        },
        
        initialize: function(){
            this.on('change',this.hasIcons);
        },
        
        hasIcons:function() {
            console.info('hasIcons called');
        }
    });
    
    return IconsModel;
});