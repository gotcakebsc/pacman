lastAddress = "";

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

createScoreScreen = function(score) {
    document.getElementById("score_submit").style.cssText="display: block;";
    document.getElementById("display_score").innerHTML=score;
    button = document.createElement("button");
    id = makeid(10);
    button.id = id;
    button.innerHTML = "Submit";
    document.getElementById("score_submit").appendChild(button);
    $("#" + id).bind('click', function(){
        let address = document.getElementById("address").value;
        let result = Web3.utils.isAddress(address);
        if (!result) {
            Swal.fire({
                title: 'Error!',
                text: 'Your address must be a valid BSC address.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            lastAddress = address;
            $.ajax({
                url: 'https://gotcakevps.xyz/add?address=' + address + "&score=" + score,
                data: {"address": address, "score": score},
                type: 'POST',
                // crossDomain: true,
                dataType: 'application/json',
                success: function() { /*alert("Success");*/ },
            error: function() { /*alert('Failed!');*/ },
            });
            killScoreSubmit();
            Swal.fire({
                title: 'Success!',
                text: 'Score submitted to leaderboard!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    });
}

killScoreSubmit = function() {
    document.getElementById("score_submit").style.cssText="display: none;";
    document.getElementById("score_submit").innerHTML = 'Submit your score of <b id="display_score">0</b>!<br><br>\nInput your BSC address: <input type="text" id="address" maxlength="42" size="50" value="' + lastAddress + '"></input>';
}