/* Nav Bar Component */

// add nav bar component
function addNavBarComponent() {

  // get element
  var navBar = document.getElementById('navBar');
  // component
  navBar.innerHTML = '<nav> \
                        <div class="nav-wrapper purple darken-3"> \
                          <a href="#!" id="logoMenu" class="brand-logo" style="font-size:25px;"><i class="material-icons">menu</i><font class="fontTitle">HelloGoGo</font></a> \
                          <ul class="right hide-on-med-and-down"> \
                            <li><a href="./userPage.html" class="robotoBold">Login / Register</a></li> \
                            <li><a href="./challenges.html" class="robotoBold">Challenges</a></li> \
                          </ul> \
                        </div> \
                      </nav>';

  // when ready
  $( document ).ready(function() {
    // click side bar
    $("#logoMenu").click(function() {
      // open side nav
      $('.sidenav').sidenav('open');
    });
  });

}
