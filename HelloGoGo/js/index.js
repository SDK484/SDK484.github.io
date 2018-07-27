/* Main index file */

// Global Vars
// * Restdb.io *
var DB = "https://hellogogo-201b.restdb.io/rest/";
var DB_MEDIA = "https://hellogogo-201b.restdb.io/media/";
var API_KEY = "5b59eacddaa1f051ef3a3ed1";

var GET_COMS = {
  "async": true,
  "crossDomain": true,
  "url": DB+"/test-companies",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": API_KEY,
    "cache-control": "no-cache"
  }
}
var GET_TRIS = {
  "async": true,
  "crossDomain": true,
  "url": DB+"/test-triggers",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": API_KEY,
    "cache-control": "no-cache"
  }
}
var RECE_LOGIN = {
  "async": true,
  "crossDomain": true,
  "url": DB+"/test-users",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": API_KEY,
    "cache-control": "no-cache"
  }
}

// cookie data
console.log(listCookies());

if (pageId == "index") {
  // add nav bar at the top
  addNavBarComponent();
  // check cookies first for data
  checkCookie("email");
  // add side bar
  addSideBarComponent(pageId);
  // add modal content
  addModalComponent();
  // make requests for data
  $.ajax(GET_COMS).done(function (response) {
    // populate companies on map
    addDataToMap(response);
    // make request for trigger data
    $.ajax(GET_TRIS).done(function (response) {
      // populate triggers on map
      populateTriggers(response);
    });
  });
} else if (pageId == "userPage") {
  // add nav bar at the top
  addNavBarComponent();
  // add side bar
  addSideBarComponent(pageId);
  // add user page info
  addUserPageComponent();
} else if (pageId == "challenges") {
  // add nav bar at the top
  addNavBarComponent();
  // add side bar
  addSideBarComponent(pageId);
  // add challenges for user
  challengeCards();
} else {
  // do nothing
}
