define(['backbone'],
        function(Backbone){
    
    var Clock = Backbone.View.extend({
        
        el : '#win-clock-tray',
        
        initialize: function() {
            var _this = this;
            this.render();
            setInterval(function(){
                _this.render();
            },60000);
        },
        
        render: function() {
            var date = new Date();
            var h = (date.getHours()<10?'0':'') + date.getHours();
            var m = (date.getMinutes()<10?'0':'') + date.getMinutes();
            
            this.$el.text( h+':'+m );
        }
        
    });

    return Clock;
});