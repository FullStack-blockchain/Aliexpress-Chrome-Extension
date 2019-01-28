chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var msg = request.data;//JSON.parse(request.data);
    console.log(msg);
    if(msg.type == "GetSupplierLink")
    {
        var supplierLink = $("#supplier_link").val();
        sendResponse({supplier_link: supplierLink, success: true});
    }
    else if(msg.type == "SendMapData")
    {
        var msgData = JSON.parse(msg.data);
        msgData.forEach(function(item) {
            if(item.propertyName.toLowerCase() == "color")
            {
                var shtml = "";
                item.values.forEach(function(value){
                    shtml += "<option value='" + value.propertyValueId + "'>" + value.propertyValueName + "</option>"
                });
                $(".cmb-map-color").html(shtml);
            }
            else// if(item.propertyName == "Size")
            {
                var shtml = "";
                item.values.forEach(function(value){
                    shtml += "<option value='" + value.propertyValueId + "'>" + value.propertyValueName + "</option>"
                });
                $(".cmb-map-size").html(shtml);
                // var cmbSizes = document.getElementsByClassName("cmb-map-size");
                // var i;
                // for (i = 0; i < cmbSizes.length; i++) {
                //     cmbSizes[i].innerHTML = "<option value='dd'>dd</option><option value='dd'>dd</option>";
                // }
            }
            
        });
        sendResponse({success: true});
    }
    sendResponse({success: false});
});

