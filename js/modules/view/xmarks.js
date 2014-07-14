define([],function(){
    var xMarks = function() {
                
        // Setup
        xRendered = [];
        Xmarks = window.Xmarks || {}; 
        Foxmarks = Xmarks;
        Xmarks.Widget = Xmarks.Widget || {};
        window["Xmarks.Widget"] = Xmarks.Widget;
        Widget = Xmarks.Widget;
        Widget.widgets = Widget.widgets || [];


        // Class (static) methods

        Widget.create = function(args) {
            obj = new Widget.widget(args);
            Widget.widgets.push(obj);
            obj.add_script();
        };


        Widget.find = function(share_id) {
            for(var n in Widget.widgets) {
                widget = Widget.widgets[n];
                if (widget.share_id == share_id && xRendered.indexOf(widget.iconsID)===-1) {
                    xRendered.push(widget.iconsID)
                    return widget;
                }
            }
            return null;
        };

        Widget.render = function(data) {
            console.info(data.data.nodes)
            var widget = Widget.find(data["share_id"]);
            widget.iconsObj.render(data.data.nodes);
        };


        // Constructor

        Widget.widget = function(args) {
            this.base_url       = args["base"] || "http://share.foxmarks.com/";
            this.share_id       = args["id"];
            this.version        = args["v"];
            this.hide_description = args["hide_description"] || false;
            this.limit          = args["limit"] || 20;
            this.css            = args["css"] || '';
            this.max_str_len    = args["truncate"] || 25;
            this.add_script     = Widget.add_script;
            //Receive backbone view
            this.iconsObj       = args["iconsObj"];
            this.iconsID        = this.iconsObj.cid;
                        
            return true;
        };

        // Object methods

        Widget.add_script = function() {
            var head, script,script_url;
            script_url = this.base_url + "folder/json/" + this.version + "/" + this.share_id + "?callback=Xmarks.Widget.render";
            head = document.getElementsByTagName("head")[0];
            if (!head) { return; }
            script = document.createElement("script");
            script.type = "text/javascript";
            script.src = script_url;
            head.appendChild(script);
        };

    };
    
    return xMarks;
});
