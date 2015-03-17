var http=require("http"),
  choice,
  wins=0,
  losses=0,
  ties=0,
  outcome="",
  result,
  choices = ["rock", "paper","scissors", "spock", "lizard"];

http.createServer(function (req, res) {
  if (req.method == 'POST') {
          choice = req.url;
          var serverChoice = Math.floor(Math.random()*5);
          if(choice === '/play/rock') {
            result = returnResult(0, serverChoice);
          }
          else if(choice === '/play/paper') {
            result = returnResult(1, serverChoice);
          }
          else if(choice === '/play/scissors') {
            result = returnResult(2, serverChoice);
          }
          else if(choice === '/play/spock') {
            result = returnResult(3, serverChoice);
          }
          else if(choice === '/play/lizard') {
            result = returnResult(4, serverChoice);
          }
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(result);
    }

  res.end();

}).listen(3000);


function returnResult(userChoice, serverChoice) {
  if(userChoice == (serverChoice+1)%5 || userChoice == (serverChoice+3)%5) {
    wins++;
    outcome = "win";
  }
  else if(serverChoice == (userChoice+1)%5 || serverChoice == (userChoice+3)%5) {
    losses++;
    outcome = "lose";
  }
  else {
    ties++;
    outcome = "tie";
  }
  console.log("user:"+choices[userChoice]+" server:"+choices[serverChoice]+" -> "+outcome);
  return returnOutcome();
}

function returnOutcome() {
  var outcomeStr = '{"outcome":"'+outcome+'", "wins":' + wins +',"losses":'+ losses +', "ties":' + ties + '}';
  return outcomeStr;
}
