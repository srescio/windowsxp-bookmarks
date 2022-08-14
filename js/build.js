//const require = require('requirejs');

require.config({
    paths: {
        jquery        : 'libs/jquery/jquery.min',
        jqueryui      : 'libs/jqueryui/jquery-ui.min',
        jqueryhotkeys : 'libs/jquery.hotkeys',
        jqueryiframetracker : 'libs/jquery.iframetracker', // no npm pkj
        underscore    : 'libs/underscore.js/underscore-min',
        backbone      : 'libs/backbone.js/backbone-min',
        handlebars    : 'libs/handlebars.js/handlebars.min',
        text          : 'libs/require-text/text.min',
        tpl           : '../tpl',
        out           : '../dist/main.js'
    },
    shim: {
        jquery: {
          exports: '$'
        },
        jqueryui: {
          deps:["jquery"],
          exports: 'jqueryui'
        },
        jqueryhotkeys: {
          deps:["jquery"],
          exports: 'jqueryhotkeys'
        },
        jqueryiframetracker : {
          deps:["jquery"],
          exports: 'jqueryiframetracker'
        },
        underscore: {
          deps:["jquery"],
          exports: '_'
        },
        backbone: {
          deps:["jquery","jqueryui","jqueryhotkeys","jqueryiframetracker","underscore"],
          exports: 'Backbone'
        },
        handlebars: {
          exports: 'Handlebars'
        }
      },
      waitSeconds: 0 //disable timeout
});

require(['modules/view/startup',
         'modules/view/welcome',
         'modules/view/desktop'],
          function(Startup,Welcome,Desktop){

    window.xp = _.extend({}, Backbone.Events);

    new Startup();
    
    setTimeout(function(){
        new Welcome();
        
        setTimeout(function(){
            new Desktop({
                user : {
                    name        :'Simone Rescio',
                    avatarUrl   :'https://1.gravatar.com/avatar/5c355fca7ea345a83e30cdc129df4aae?s=48&amp;d=retro&amp;r=G',
                    email       :'info@simonerescio.it',
                    website     :'https://simonerescio.it'
                },

                social : {
                    github      :'https://github.com/srescio/windowsxp-bookmarks',
                    codepen     :'http://codepen.io/srescio/',
                    twitter     :'https://twitter.com/srescio/',
                    linkedin    :'https://www.linkedin.com/pub/simone-rescio/30/732/929/en'
                },

                bookmarks : {
                    desktop     :'flBxqNRXWr',
                    startmenu   :'flBxqNRXWr',
                    documents   :'dey0PVdtzf'            
                }
            });
        },6000);
        
    },10000);
    
});