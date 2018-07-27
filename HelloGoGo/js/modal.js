/* Modal Component */

// add modal component
function addModalComponent() {

  // get element
  var modal = document.getElementById('modalBox');
  // component
  modal.innerHTML = ' <!-- Modal Structure --> \
                      <div id="modal1" class="modal"> \
                        <div id="modal-content" class="modal-content modalCentre"> \
                        </div> \
                      </div>';

  // add listeners
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

}
