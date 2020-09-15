const enter = document.querySelector(".string")
const userText = document.querySelector("#userInput")

enter.addEventListener("submit", function(e){
  e.preventDefault()
  makeReq()
})

function makeReq(n){
  let val = userText.value
  var request = new XMLHttpRequest();
  request.open('GET', '/api?text='+val, true);

  request.onload = function() {
      console.log("works")
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        console.log(data)
        document.getElementById("pal").innerHTML = data.name


      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
}
