/* User Page Component */

// add user page component
function addUserPageComponent() {

  // get element
  var userPage = document.getElementById('userBox');
  userPage.innerHTML = '<div class="section"></div> \
      <div class="container"> \
        <!-- Login Box --> \
        <div class="z-depth-1 grey lighten-4 row inputBox"> \
          <div class="headerTitle"><b>Login</b></div> \
          <form class="col s12" action="javascript: receiveLogin()" method="get"> \
            <div class="row"> \
              <div class="col s12"> \
              </div> \
            </div> \
            <div class="row"> \
              <div class="input-field col s12"> \
                <input class="validate" type="email" name="email" id="email" /> \
                <label for="email">Enter your email</label> \
              </div> \
            </div> \
            <div class="row"> \
              <div class="input-field col s12"> \
                <input class="validate" type="password" name="password" id="password" /> \
                <label for="password">Enter your password</label> \
              </div> \
              <label class="passwordLabel"> \
								<a class="pink-text" href="#!"><b>Forgot Password?</b></a> \
							</label> \
            </div> \
            <br /> \
            <center> \
              <div class="row"> \
                <button type="submit" name="btn_login" class="col s12 btn btn-large waves-effect indigo">Login</button> \
              </div> \
            </center> \
          </form> \
        </div> \
        <!-- Reg Box --> \
        <div class="z-depth-1 grey lighten-4 row inputBox"> \
          <div class="headerTitle"><b>Registration</b></div> \
          <form class="col s12" action="javascript: createNewDoc()" method="post"> \
            <div class="row"> \
              <div class="col s12"> \
              </div> \
            </div> \
            <div class="row"> \
              <div class="input-field col s12"> \
                <select name="type" id="newType"> \
                  <option value="user" selected>User</option> \
                  <option value="company">Company</option> \
                </select> \
                <label>Select profile type</label> \
              </div> \
            </div> \
            <div class="row"> \
              <div class="input-field col s12"> \
                <input class="validate" type="text" name="newName" id="newName" /> \
                <label for="newName">Enter a username or name</label> \
              </div> \
            </div> \
            <div class="row"> \
              <div class="input-field col s12"> \
                <input class="validate" type="email" name="newEmail" id="newEmail" /> \
                <label for="newEmail">Enter your email</label> \
              </div> \
            </div> \
            <div class="row"> \
              <div class="input-field col s12"> \
                <input class="validate" type="password" name="newPassword" id="newPassword" /> \
                <label for="newPassword">Enter your password</label> \
              </div> \
              <label class="passwordLabel"> \
								<a class="pink-text" href="#!"><b>Need Password tips?</b></a> \
							</label> \
            </div> \
            <br /> \
            <center> \
              <div class="row"> \
                <button type="submit" name="btn_reg" class="col s12 btn btn-large waves-effect indigo">Sign Up!</button> \
              </div> \
            </center> \
          </form> \
        </div> \
      </div>';

  $(document).ready(function(){
    $('select').formSelect();
  });

}

// get login check
function receiveLogin() {
  // local vars
  var email = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  var bool = false;
  // cookie data
  var cookieEmail;

  $.ajax(RECE_LOGIN).done(function (response) {
    // check login details
    for (var i = 0; i < response.length; i++) {
      if (email === response[i].email && pass === response[i].password) {
        cookieEmail = response[i].email;
        bool = true
        break;
      }
    }
    // check login was found
    if (bool) {
      setCookie("email", cookieEmail, 3);
      window.location = "../index.html?user";
    } else {
      alert("Login was unsuccessful - please try again");
    }
  });
}

// create new user
function createNewDoc() {
  // local vars
  var type = document.getElementById("newType").value;
  var name = document.getElementById("newName").value;
  var email = document.getElementById("newEmail").value;
  var pass = document.getElementById("newPassword").value;
  // cookie data
  var cookieEmail = email;
  // create json object
  var obj = { "name": name, "email": email, "password": pass, "type": type, "visits": [] };

  // set up post config
  var CREATE_NEW_USER = {
    "async": true,
    "crossDomain": true,
    "url": DB+"/test-users",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-apikey": API_KEY,
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(obj)
  }

  // post data
  $.ajax(CREATE_NEW_USER).done(function (response) {
    setCookie("email", cookieEmail, 3);
    window.location = "../index.html?user";
  });
}

// generate random id
function guidGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
