define([],function(){
    var xMarks = function() {
                
        // Setup

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
                if (widget.share_id == share_id) {
                    return widget;
                }
            }
            return null;
        };

        Widget.of = function(s)
        {
            var div = document.createElement('div');
            var text = document.createTextNode(s);
            div.appendChild(text);
            return div.innerHTML;
        };

        Widget.ofa = function(s)
        {
            s=typeof(s)=="undefined"?"":s.toString();
            s = s.replace(/\\/g, "\\\\");
            s = s.replace(/'/g, "\\\'");
            s = s.replace(/"/g, "\\\"");

            var len = s.length;
            var s2 = "";
            var c = 0;
            var i;
            for (i=0 ; i<len ; ++i)
            {
                c = s.charCodeAt(i);
                if (c<48 || (c>57 && c<65) || (c>90 && c<97) || c>122)
                {
                    c = c.toString(16);
                    if (c.length!=2)
                        c = "0"+c;
                    s2 += "&#x"+c+";";
                }
                else
                    s2 += s[i];
            }
            return s2;
        };


        Widget.render = function(data) {       
            var widget = Widget.find(data["share_id"]);
            widget.iconsObj.render(data.data.nodes);            
        };


        // Constructor

        Widget.widget = function(args) {
            this.base_url = args["base"] || "http://share.foxmarks.com/";
            this.share_id = args["id"];
            this.version = args["v"];
            this.hide_description = args["hide_description"] || false;
            this.limit = args["limit"] || 20;
            this.css = args["css"] || '';
            this.max_str_len = args["truncate"] || 25;
            this.display_str = Widget.display_str;
            this.add_script = Widget.add_script;
            //Receive backbone view
            this.iconsObj = args["iconsObj"];
                        
            return true;
        };

        // Object methods

        Widget.display_str = function(str) {
            if (str.length < this.max_str_len) { return str; }
            return (str.substring(0, this.max_str_len) + "...")
        };

        Widget.add_script = function() {
            var head, script;
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
