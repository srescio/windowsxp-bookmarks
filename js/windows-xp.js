require.config({
    paths: {
        jquery        : 'libs/node/jquery.min',
        jqueryui      : 'libs/node/jquery-ui.min',
        jqueryhotkeys : 'libs/node/jquery-hotkeys',
        jqueryiframetracker : 'libs/jquery.iframetracker', // no npm package
        underscore    : 'libs/node/underscore-min',
        backbone      : 'libs/node/backbone-min',
        handlebars    : 'libs/node/handlebars.min',
        text          : 'libs/node/text',
        howler        : 'libs/node/howler.min',
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
            fetch('/data/data.json')
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
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
                      linkedin    :'https://it.linkedin.com/in/simone-rescio/en'
                  },
  
                  bookmarks : {
                      desktop     : data.find(el => el.directory == 'BugFix'),
                      startmenu   : data.find(el => el.directory == 'Tools'),
                      documents   : data.find(el => el.directory == 'Docs')
                  }
                });
              });
        },6000);
        
    },10000);
    
});