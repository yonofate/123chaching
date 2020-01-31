angular.module("punnelApp").controller("customPopupCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", c.pos = ['Mặc định', 'Trên trái', 'Trên phải', 'Dưới trái', 'Dưới phải'],
        a.$watch(function () {
            if (selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "widget_section" == selectedItem.attr("pn-type") && "true" == selectedItem.attr("pn-popup")) {
                c.idTMP = selectedItem.attr("id");
                var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                c.selectedPos = apiElement[a].media[deviceEdit].popupPos || 'Mặc định';
                c.setPos(c.selectedPos);
                    if (deviceEdit == 'mobile') {
                        c.widthType = apiElement[a].media[deviceEdit].width || 'auto';
                        //if (apiElement[a].media[deviceEdit].height == '100vh') {
                        //    var t = selectedItem.find(".container").eq(0);
                        //    t.css({
                        //        "height": '100vh'
                        //    });
                        //}                      
                        c.setWidthType(c.widthType);
                }

                if (deviceEdit == 'mobile') $('.custom-popup .width-type').show();
                else $('.custom-popup .width-type').hide();
            //c.stickyPos = apiElement[a].stickyPos, c.stickyPos || (c.stickyPos = "top", apiElement[a].stickyPos = "top"), c.stickyUsing = apiElement[a].stickyUsing, c.stickyUsing || (c.stickyUsing = "0"), apiElement[a].stickykc && apiElement[a].stickykc.length > 0 ? c.stickykc = parseFloat(apiElement[a].stickykc) : c.stickykc = 0
        }
        }),
        c.setPos = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media[deviceEdit].popupPos = a, c.selectedPos = a

            //var t = selectedItem.find(".container").eq(0);
            //if(a=='Trên trái')            
            //t.css({
            //    "position": "absolute",
            //    "top": "0",
            //    "left": "0",
            //    "bottom": "auto",
            //    "right":"auto"
            //});
            //if (a == 'Trên phải')
            //    t.css({
            //        "position": "absolute",
            //        "top": "0",
            //        "right": "0",
            //        "left": "auto",
            //        "bottom": "auto",
            //    });
            //if (a == 'Dưới trái')
            //    t.css({
            //        "position": "absolute",
            //        "bottom": "0",
            //        "left": "0",
            //        "top": "auto",
            //        "right": "auto",
            //    });
            //if (a == 'Dưới phải')
            //    t.css({
            //        "position": "absolute",
            //        "bottom": "0",
            //        "right": "0",
            //        "top": "auto",
            //        "left": "auto",
            //    });
            //if (a == 'Mặc định')
            //    t.css({
            //        "position": "relative"
            //    });
        }
        },
        c.setWidthType = function (w) {
        if (w == 'auto') w = '375px';
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media[deviceEdit].width = w, c.widthType = w;
            //var t = selectedItem.find(".container").eq(0);
            //    t.css({
            //        "width": w
            //    });
            }
        };
}]);