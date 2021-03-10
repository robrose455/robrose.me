
let scene, camera, renderer;
let body, neck, head, r_eye, l_eye, l_pupil, r_pupil, rf_leg, lf_leg, rb_leg, lb_leg;
let dinoMat, hornMat, blackMat, whiteMat;

var animationActive = false;
var dino = new THREE.Group();

var bark = new Audio("bark.wav");


document.addEventListener("keydown", onDocumentKeyDown);

function init() {

  //Creates Scene Object
  scene = new THREE.Scene();

  //Create Camera to view scene
  // Can use camera.position to adjust view angle
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);

  //Creates renderer to create cube
  renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var dinoColor = 0x73eb34
  var hornColor = 0xc1c4c9

  var white = 0xFFFFFF;
  var black = 0x000000;

  //Making the Object
  //Making a a box outline
  var bodyGeometry = new THREE.BoxGeometry(4.2,1,1);
  var neckGeometry = new THREE.CylinderGeometry(0.25,0.25,3,32);
  var headGeometry = new THREE.SphereGeometry(0.75,32,32);
  var legGeometry = new THREE.CylinderGeometry(0.1,0.1,2,32);
  var eyeGeometry = new THREE.SphereGeometry(0.3,32,32);
  var pupilGeometry = new THREE.SphereGeometry(0.1,32,32);
  var tailGeometry = new THREE.ConeGeometry(0.5,1,32);

  var hornGeometry = new THREE.ConeGeometry(0.5,0.5,32);
  //Materials for object
  dinoMat = new THREE.MeshPhongMaterial({color: dinoColor});
  hornMat = new THREE.MeshPhongMaterial({color: hornColor});
  blackMat = new THREE.MeshPhongMaterial({color: black});
  whiteMat = new THREE.MeshPhongMaterial({color: white});

  //Combines Mats and Geometry to create object
  body = new THREE.Mesh(bodyGeometry, dinoMat);
  neck = new THREE.Mesh(neckGeometry, dinoMat);
  head = new THREE.Mesh(headGeometry, dinoMat);

  rf_leg = new THREE.Mesh(legGeometry, dinoMat);
  lf_leg = new THREE.Mesh(legGeometry, dinoMat);
  rb_leg = new THREE.Mesh(legGeometry, dinoMat);
  lb_leg = new THREE.Mesh(legGeometry, dinoMat);

  horn1 = new THREE.Mesh(hornGeometry, hornMat);
  horn2 = new THREE.Mesh(hornGeometry, hornMat);
  horn3 = new THREE.Mesh(hornGeometry, hornMat);

  r_eye = new THREE.Mesh(eyeGeometry,whiteMat);
  l_eye = new THREE.Mesh(eyeGeometry,whiteMat);

  r_pupil = new THREE.Mesh(pupilGeometry,blackMat);
  l_pupil = new THREE.Mesh(pupilGeometry,blackMat);

  tail = new THREE.Mesh(tailGeometry,dinoMat);

  // Adding parts to the group
  dino.add(body);
  dino.add(neck);
  dino.add(head);

  dino.add(rb_leg);
  dino.add(lb_leg);
  dino.add(rf_leg);
  dino.add(lf_leg);

  dino.add(horn1);
  dino.add(horn2);
  dino.add(horn3);

  dino.add(r_eye);
  dino.add(l_eye);

  dino.add(r_pupil);
  dino.add(l_pupil);

  dino.add(tail);

  //Positions the parts to "assemble" the dino

  lb_leg.position.z += .5;
  lf_leg.position.z += .5;

  rb_leg.position.z += -0.5;
  rf_leg.position.z += -0.5;

  lb_leg.position.y += -0.5;
  lf_leg.position.y += -0.5;

  rb_leg.position.y += -0.5;
  rf_leg.position.y += -0.5;

  lb_leg.position.x += 2;
  lf_leg.position.x += -2;

  rb_leg.position.x += 2;
  rf_leg.position.x += -2;

  horn1.position.x += 1;
  horn2.position.x += 0;
  horn3.position.x += -1;

  horn1.position.y += 0.75;
  horn2.position.y += 0.75;
  horn3.position.y += 0.75;

  r_eye.position.x += -2.5;
  l_eye.position.x += -2.5;

  r_eye.position.y += 2;
  l_eye.position.y += 2;

  r_eye.position.z += -0.5;
  l_eye.position.z += .5;

  r_pupil.position.x += -2.8;
  l_pupil.position.x += -2.8;

  r_pupil.position.y += 2;
  l_pupil.position.y += 2;

  r_pupil.position.z += -0.5;
  l_pupil.position.z += .5;

  tail.position.x += 2.4;
  tail.position.y += -.3;
  tail.rotation.z += -2;

  neck.position.y += (body.position.x + 1);
  neck.position.x += (body.position.y - 2);

  head.position.x += -2;
  head.position.y += 2;


  // Add Dino to scene
  scene.add(dino);

  // Adding Light
  scene.add(new THREE.AmbientLight (0x666666));
  scene.add(new THREE.DirectionalLight( 0xFFFFFF, 0.125));

  //Initial Pose
  camera.position.z = 10;
  dino.rotation.y = 45;

}

function update() {

  //Requests update to be ran on every open frame on the thread
  requestAnimationFrame(update);

  render();

}

function render() {

  renderer.render( scene, camera);

}

function onDocumentKeyDown(event) {

  var keyCode = event.which;

  //A
  if(keyCode == 65) {
    dino.rotation.y += 0.1;
  }

  //D
  if(keyCode == 68) {
    dino.rotation.y += -0.1;
  }

  //W
  if(keyCode == 87) {
    walkCycle();
    dino.position.x += .10;
  }

  //S
  if(keyCode == 83) {
    walkCycle();
    dino.position.x -= .10;
  }

  if(keyCode == 66) {
    blink();
  }

  if(keyCode == 70) {
    walkCycle();
  }

  if(keyCode == 84) {
    bark.play();
  }


}

function blink() {

 if (l_pupil.visible == true) {

   l_pupil.visible = false;
   r_pupil.visible = false;

   r_eye.material = dinoMat;
   l_eye.material = dinoMat;

 } else {

   l_pupil.visible = true;
   r_pupil.visible = true;

   r_eye.material = whiteMat;
   l_eye.material = whiteMat;

 }

}

function walkCycle() {

    if (animationActive == false) {

      animationActive = true;

    rf_leg.rotation.z += 45;
    lb_leg.rotation.z += 45;

    setTimeout(function() {

      rf_leg.rotation.z -= 45;
      lb_leg.rotation.z -= 45;

    }, 1000);

    setTimeout(function() {

    rb_leg.rotation.z += 45;
    lf_leg.rotation.z += 45;

   }, 2000);

    setTimeout(function() {

      rb_leg.rotation.z -= 45;
      lf_leg.rotation.z -= 45;
      animationActive = false;

    }, 3000);

  }

}


init();
update();
