define(['backbone'],function(Backbone){
    var StartmenuModel = Backbone.Model.extend({
        defaults : {
                user: {
                    avatar :'http://1.gravatar.com/avatar/5c355fca7ea345a83e30cdc129df4aae?s=48&amp;d=retro&amp;r=G',
                    username:'Simone Rescio'
                },
                right: [
                    {
                        href :'http://simonerescio.it',
                        src  :'img/mydocs.png',
                        name :'My Documents'
                    },
                    {
                        href :'mailto:info@simonerescio.it',
                        src  :'img/mypics.png',
                        name :'My Pictures'
                    },
                    {
                        href :'mailto:info@simonerescio.it',
                        src  :'img/mymusic.png',
                        name :'My Music'
                    },
                    {
                        href :'mailto:info@simonerescio.it',
                        src  :'img/mynet.png',
                        name :'My Network Places'
                    }
                ]
                    
        },
        initialize: function(){
            // Nothing to do here
        }
    });
    
    return StartmenuModel;
});