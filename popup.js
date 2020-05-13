var curprice = 0;
var buyusd = '--';
var buyeth = '--';
var buybtc = '--';

function precise2(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:2});
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


function color(x) {
  if(x<0) {
     return '<span class="red">'+precise2(x)+'% &#x2193;</span>';
  } else {
    return '<span class="green">+'+precise2(x)+'% &#x2191;</span>';
  }
}


function fetch()
{
	ajax_get('https://api.coinpaprika.com/v1/tickers/ava-travala?quotes=USD,ETH,BTC', function(data) {
	
	buyusd = data['quotes']['USD']['price'];
  buybtc = data['quotes']['BTC']['price'];
  buyeth = data['quotes']['ETH']['price'];

	document.getElementById("USD").innerHTML = buyusd;
  document.getElementById("BTC").innerHTML = buybtc;
  document.getElementById("ETH").innerHTML = buyeth;

  document.getElementById("h24").innerHTML = color(data['quotes']['USD']['percent_change_24h']);
  document.getElementById("d7").innerHTML = color(data['quotes']['USD']['percent_change_7d']);
  document.getElementById("d30").innerHTML = color(data['quotes']['USD']['percent_change_30d']);
  document.getElementById("y1").innerHTML = color(data['quotes']['USD']['percent_change_1y']);

  }); 
}


function pricerefresh(){
  var x = setInterval(function() {
  fetch(); 
  
}, 2000);
}

fetch();