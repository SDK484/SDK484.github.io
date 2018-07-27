/* cookie functions */

// get cookies
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

// set cookies
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// check for cookies
function checkCookie(findC) {
  var ele = getCookie(findC);
  if (ele != "") {
    pageId = "user";
  }
}

// list cookies
function listCookies() {
  var theCookies = document.cookie.split(';');
  var aString = '';
  for (var i = 1 ; i <= theCookies.length; i++) {
      aString += i + ' ' + theCookies[i-1] + "\n";
  }
  return aString;
}

// delete cookie sign in
function deleteCookies() {
  document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();
}
