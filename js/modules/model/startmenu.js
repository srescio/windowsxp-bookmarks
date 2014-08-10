define(['backbone'],function(Backbone){
    var StartmenuModel = Backbone.Model.extend({
        defaults : {
                user: {
                    name        :'Simone Rescio',
                    avatarUrl   :'https://1.gravatar.com/avatar/5c355fca7ea345a83e30cdc129df4aae?s=48&amp;d=retro&amp;r=G',
                    email       :'info@simonerescio.it',
                    website     :'https://simonerescio.it'
                },
                
                social : [
                    {
                        href :'https://github.com/srescio/',
                        src  :'img/github.png',
                        name :'Source',
                        desc :'github.com/srescio/'
                    },
                    {
                        href :'http://codepen.io/srescio/',
                        src  :'img/codepen.png',
                        name :'Demos',
                        desc :'codepen.io/srescio/'
                    },
                    {
                        href :'https://twitter.com/srescio/',
                        src  :'img/twitter.png',
                        name :'Tweets',
                        desc :'@srescio'
                    },
                    {
                        href :'http://it.linkedin.com/pub/simone-rescio/30/732/929/',
                        src  :'img/linkedin.png',
                        name :'Curriculum Vitae',
                        desc :'linkedin.com'
                    }                    
                ],
                
                right: [
                    {
                        href :'',
                        src  :'img/mydocs.png',
                        name :'My Documents'
                    },
                    {
                        href :'http://www.istockphoto.com/stock-photos',
                        src  :'img/mypics.png',
                        name :'My Pictures'
                    },
                    {
                        href :'http://grooveshark.com/',
                        src  :'img/mymusic.png',
                        name :'My Music'
                    }
                ]
                    
        },
        initialize: function(){
            // Nothing to do here
        }
    });
    
    return StartmenuModel;
});