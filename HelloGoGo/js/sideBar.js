/* Side Bar Component */

// add side bar component
function addSideBarComponent(pageId) {

  // get element
  var sideBar = document.getElementById('sideBar');
  // component
  if (pageId == "index") {
    sideBar.innerHTML = '<ul id="slide-out" class="sidenav purple darken-2"> \
                          <li><a><i class="material-icons white-text">control_point</i><color class="fontColor">Filter Results</color></a></li> \
                          <li><a><span class="spanText fontColor">radius</span><span class="spanInput"><input class="inputRange" style="border:0px solid white;" type="range" id="radiusSlider" min="1" max="30"/></span></a></li> \
                          <li id="tagList"><a style="height:250px;"><span class="spanText fontColor" style="position:relative;top:80px;">tags</span><span class="spanInput"><div id="tagsChips" class="chips chips-initial inputTags"></div></span></a></li> \
                          <li><a style="height:80px;"><span class="spanText fontColor" style="position:relative;top:20px;">search</span><span class="spanInput"><div class="input-field col s6 inputKeyword"><input id="keyword" type="text" class="validate"><label for="keyword">keyword</label></div></div></span></a></li> \
                          <li><div class="divider"></div></li> \
                          <li><a href="./index.html"><i class="material-icons white-text">home</i><color class="fontColor">Home</color></a></li> \
                          <li><a href="./userPage.html"><i class="material-icons white-text">group</i><color class="fontColor">User</color></a></li> \
                          <li><a href="./challenges.html"><i class="material-icons white-text">assignment</i><color class="fontColor">Challenges</color></a></li> \
                        </ul> \
                        <a href="#" id="hidMenuBar" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>';
  } else if (pageId == "user") {
    sideBar.innerHTML = '<ul id="slide-out" class="sidenav purple darken-2"> \
                          <li><div class="user-view"> \
                            <div class="background"> \
                              <img src="../assets/material-background.png"> \
                            </div> \
                            <a><img class="circle" src="../assets/user.png"></a> \
                            <a><span class="white-text email"><b>'+getCookie("email")+'</b></span></a> \
                            <a><span class="white-text" onClick="deleteCookies();"><b>Sign Out</b></span></a> \
                          </div></li> \
                          <li><a><i class="material-icons white-text">control_point</i><color class="fontColor">Filter Results</color></a></li> \
                          <li><a><span class="spanText fontColor">radius</span><span class="spanInput"><input class="inputRange" style="border:0px solid white;" type="range" id="radiusSlider" min="1" max="30"/></span></a></li> \
                          <li id="tagList"><a style="height:250px;"><span class="spanText fontColor" style="position:relative;top:80px;">tags</span><span class="spanInput"><div id="tagsChips" class="chips chips-initial inputTags"></div></span></a></li> \
                          <li><a style="height:80px;"><span class="spanText fontColor" style="position:relative;top:20px;">search</span><span class="spanInput"><div class="input-field col s6 inputKeyword"><input id="keyword" type="text" class="validate"><label for="keyword">keyword</label></div></div></span></a></li> \
                          <li><div class="divider"></div></li> \
                          <li><a href="./index.html"><i class="material-icons white-text">home</i><color class="fontColor">Home</color></a></li> \
                          <li><a href="./userPage.html"><i class="material-icons white-text">group</i><color class="fontColor">User</color></a></li> \
                          <li><a href="./challenges.html"><i class="material-icons white-text">assignment</i><color class="fontColor">Challenges</color></a></li> \
                          <br/><br/><br/><br/> \
                        </ul> \
                        <a href="#" id="hidMenuBar" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>';
  } else {
    sideBar.innerHTML = '<ul id="slide-out" class="sidenav purple darken-2"> \
                          <li><a href="./index.html"><i class="material-icons white-text">home</i><color class="fontColor">Home</color></a></li> \
                          <li><a href="./userPage.html"><i class="material-icons white-text">group</i><color class="fontColor">User</color></a></li> \
                          <li><a href="./challenges.html"><i class="material-icons white-text">assignment</i><color class="fontColor">Challenges</color></a></li> \
                        </ul> \
                        <a href="#" id="hidMenuBar" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>';
  }

  // run on element create
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

  // when ready
  $(document).ready(function() {
    $('.chips-initial').chips({
      data: [{
        tag: 'Shop',
      }, {
        tag: 'Food',
      }, {
        tag: 'Pub',
      }, {
        tag: 'Cafe',
      }, {
        tag: 'Visit',
      }, {
        tag: 'Sport',
      }],
      limit: 6
    });
  });

}
