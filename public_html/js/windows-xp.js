require.config({
    paths: {
        jquery        : 'libs/jquery/jquery.min',
        jqueryui      : 'libs/jqueryui/jquery-ui.min',
        jqueryhotkeys : 'libs/jquery.hotkeys',
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
        underscore: {
          deps:["jquery"],
          exports: '_'
        },
        backbone: {
          deps:["jquery","jqueryui","jqueryhotkeys","underscore"],
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

//    var startup = new Startup();
//    
//    setTimeout(function(){
//        var welcome = new Welcome();
//        
//        setTimeout(function(){
//            var desktop = new Desktop();
//        },6000);
//        
//    },10000);
    
    var desktop = new Desktop();
});