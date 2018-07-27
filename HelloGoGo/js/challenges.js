/* Challenges */

// global variables
var challArray = [["challTest1.jpg", "challTest1Temp.jpg"], ["challTest2.jpg", "challTest2Temp.jpg"], ["challTest3.jpg", "challTest3Temp.jpg"]];

// add challenge cards
function challengeCards() {

  // add all challenges
  var cardsBox = document.getElementById("challBox");
  for (var i = 0; i < challArray.length; i++) {
    cardsBox.innerHTML += '<div class="inputBox"> \
                            <div class="card"> \
                              <div class="card-image waves-effect waves-block waves-light"> \
                                <img id="challImg'+(i+1)+'" class="activator" src="./assets/'+challArray[i][0]+'"> \
                              </div> \
                              <div class="card-content"> \
                                <span class="card-title activator grey-text text-darken-4">Challenge '+(i+1)+'<i class="material-icons right">more_vert</i></span> \
                                <p>Take a photo of the above point of interest</p> \
                              </div> \
                              <div class="card-reveal"> \
                                <span class="card-title grey-text text-darken-4">Challenge '+(i+1)+'<i class="material-icons right">close</i></span> \
                                <p>Find this site at the following point</p> \
                                <div><img id="challImgTemp'+(i+1)+'" src="./assets/'+challArray[i][1]+'"></div> \
                                <div><input type="file" id="fileInput'+(i+1)+'" accept="image/*" /></div> \
                                <canvas id="canvasOutput'+(i+1)+'"></canvas> \
                                <div class="mapBox" id="mapChall'+(i+1)+'"></div> \
                              </div> \
                            </div> \
                          </div>';
  }
}

// open cv on ready
function onOpenCvReady() {
  console.log('OpenCV js is ready....');
  // get ids for template matching
  addTemplateMatching();
}

// start map
function initMap() {

  // get maps
  var mapBox1 = document.getElementById('mapChall1');
  var mapBox2 = document.getElementById('mapChall2');
  var mapBox3 = document.getElementById('mapChall3');

  // add maps
  addMapLogic(mapBox1, 'Challenge Map 1');
  addMapLogic(mapBox2, 'Challenge Map 2');
  addMapLogic(mapBox3, 'Challenge Map 3');

}

// add map logic
function addMapLogic(mapBox, mapTitle) {
  var map = new google.maps.Map(mapBox, {
    center: {lat: 54.596841, lng: -5.930828},
    zoom: 16
  });
  var marker = new google.maps.Marker({
    position: {lat: 54.596841, lng: -5.930828},
    map: map,
    title: mapTitle
  });
}

// add template matching
function addTemplateMatching() {
  // input element
  let inputElement1 = document.getElementById('fileInput1');
  let inputElement2 = document.getElementById('fileInput2');
  let inputElement3 = document.getElementById('fileInput3');
  // input onload
  inputElement1.onclick = function() {
    templateMatchingLogic(challImg1, challImgTemp1, canvasOutput1);
  };
  inputElement2.onclick = function() {
    templateMatchingLogic(challImg2, challImgTemp2, canvasOutput2);
  };
  inputElement3.onclick = function() {
    templateMatchingLogic(challImg3, challImgTemp3, canvasOutput3);
  };
}

// template matching logic
function templateMatchingLogic(challImg, challImgTemp, canvasOutput) {
  let src = cv.imread(challImg);
  let templ = cv.imread(challImgTemp);
  let dst = new cv.Mat();
  let mask = new cv.Mat();
  cv.matchTemplate(src, templ, dst, cv.TM_CCOEFF, mask);
  let result = cv.minMaxLoc(dst, mask);
  let maxPoint = result.maxLoc;
  let color = new cv.Scalar(255, 0, 0, 255);
  let point = new cv.Point(maxPoint.x + templ.cols, maxPoint.y + templ.rows);
  cv.rectangle(src, maxPoint, point, color, 2, cv.LINE_8, 0);
  cv.imshow(canvasOutput, src);
  src.delete(); dst.delete(); mask.delete();
}
