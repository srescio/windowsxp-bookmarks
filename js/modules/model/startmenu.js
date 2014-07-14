define(['backbone'],function(Backbone){
    var StartmenuModel = Backbone.Model.extend({
        defaults : {
                user: {
                    avatar :'http://1.gravatar.com/avatar/5c355fca7ea345a83e30cdc129df4aae?s=48&amp;d=retro&amp;r=G',
                    username:'Simone Rescio'
                },
                left: [
                    {
                        href :'http://simonerescio.it',
                        src  :'img/simonerescio.ico',
                        name :'Internet',
                        desc :'simonerescio.it',
                        target : '_blank'
                    },
                    {
                        href :'mailto:info@simonerescio.it',
                        src  :'img/outlook.png',
                        name :'E-mail',
                        desc :'info@simonerescio.it',
                        target : '_self'
                    }
                ],
                
                recent : [
                    {
                        href :'https://github.com/srescio',
                        src  :'img/github.png',
                        name :'Source',
                        desc :'github.com/srescio/',
                        target : '_blank'
                    },
                    {
                        href :'http://codepen.io/srescio/',
                        src  :'img/codepen.png',
                        name :'Demos',
                        desc :'codepen.io/srescio/',
                        target : '_blank'
                    },
                    {
                        href :'https://twitter.com/srescio',
                        src  :'img/twitter.png',
                        name :'Tweets',
                        desc :'@srescio',
                        target : '_blank'
                    },
                    {
                        href :'http://it.linkedin.com/pub/simone-rescio/30/732/929/',
                        src  :'img/linkedin.png',
                        name :'Curriculum Vitae',
                        desc :'linkedin.com',
                        target : '_blank'
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
                    },
//                    {
//                        href :'http://simonerescio.it',
//                        src  :'img/mynet.png',
//                        name :'My Network Places'
//                    }
                ]
                    
        },
        initialize: function(){
            // Nothing to do here
        }
    });
    
    return StartmenuModel;
});