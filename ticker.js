var curprice = 0;
var buy = '--';

function precise3(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:3});
}

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function fetch()
{
	ajax_get('https://api.coinpaprika.com/v1/tickers/ava-travala?quotes=USD', function(data) {
	curprice = data['quotes']['USD']['price'];
	buy = precise3(curprice);
	chrome.browserAction.setBadgeText({text: buy});
  	}); 
}


function pricerefresh(){
  var x = setInterval(function() {
  fetch(); 
  
}, 10000);
}


pricerefresh();
fetch();


chrome.browserAction.setBadgeBackgroundColor({ color: [83, 77, 82, 255] });
chrome.browserAction.setBadgeText({text: buy});