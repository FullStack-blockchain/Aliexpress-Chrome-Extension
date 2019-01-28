document.addEventListener('DOMContentLoaded', function() {
    var btnStart = document.getElementById('btnAliMapStart');

    function getProductById(productId)
    {
      //XMLHttpRequest Handler : Product variations & details
      var xhr_variations = new XMLHttpRequest();
      var xhr_details = new XMLHttpRequest();

      //Request Param
      var data = JSON.stringify({"productId": productId, "currency": "AUD", "locale": "en_US"});
      //Aliseeks API Key
      var API_KEY = 'FJBQCTRBWFCYPDLZ';
      //Product details & variations END_POINT
      var url_details = "https://api.aliseeks.com/v1/products/details";
      var url_variations = "https://api.aliseeks.com/v1/products/variations";
      
      xhr_variations.open("POST", url_variations, true);
      xhr_variations.setRequestHeader("Content-Type", "application/json");
      xhr_variations.setRequestHeader('X-Api-Client-Id', API_KEY);
      xhr_variations.send(data);
      
      //
      var res_variations, res_details;
      xhr_variations.onreadystatechange = function () {
        if (xhr_variations.readyState === 4 && xhr_variations.status === 200) {
          res_variations = JSON.parse(xhr_variations.responseText);

          //Get product details
          xhr_details.open("POST", url_details, true);
          xhr_details.setRequestHeader("Content-Type", "application/json");
          xhr_details.setRequestHeader('X-Api-Client-Id', API_KEY);
          xhr_details.send(data);
        }
      };
      
      xhr_details.onreadystatechange = function () {
        if (xhr_details.readyState === 4 && xhr_details.status === 200) {
          res_details = JSON.parse(xhr_details.responseText);

          // res_variations.variations.forEach(function(item_variation) {
          // });

          // res_details.skuProperties.forEach(function(item_skuProperty) {

          // });

          var requestParam = {"type": "SendMapData", "data": JSON.stringify(res_details.skuProperties)};
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {data: requestParam}, function(response) {
              if(response.success)
              {
                console.log(response);
              }
            });
          });
        }
      };
    }

    btnStart.addEventListener('click', function(){
      var productId = "";
      var requestParam = {"type": "GetSupplierLink"};

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {data: requestParam}, function(response) {
          if(response.success)
          {
            productId = response.supplier_link;
            getProductById(productId);
          }
        });
      });
    });


}, false);