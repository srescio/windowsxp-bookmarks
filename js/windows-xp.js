require.config({
    paths: {
        jquery        : 'libs/jquery/jquery.min',
        jqueryui      : 'libs/jqueryui/jquery-ui.min',
        jqueryhotkeys : 'libs/jquery.hotkeys',
        jqueryiframetracker : 'libs/jquery.iframetracker',
        underscore    : 'libs/underscore.js/underscore-min',
        backbone      : 'libs/backbone.js/backbone-min',
        handlebars    : 'libs/handlebars.js/handlebars.min',
        text          : 'libs/require-text/text.min',
        tpl           : '../tpl'
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
      }
});

require(['modules/view/startup',
         'modules/view/welcome',
         'modules/view/desktop'],
          function(Startup,Welcome,Desktop){

    window.xp = _.extend({}, Backbone.Events);

    new Startup();
//    
//    setTimeout(function(){
//        new Welcome();
//        
//        setTimeout(function(){
//            new Desktop();
//        },6000);
//        
//    },10000);
    
    new Desktop({
        user : {
            name        :'Simone Rescio',
            avatarUrl   :'url',
            email       :'info@simonerescio.it',
            website     :'http://simonerescio.it'
        },
        
        social : {
            github      : '',
            codepen     : '',
            tiwtter     : '',
            linkedin    : ''
        },
        
        bookmarks : {
            desktop     :'xmarks',
            startmenu   :'xmarks',
            documents   :'xmarks'            
        }
    });
});