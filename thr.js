
let scene, camera, renderer, cube;

function init() {

  //Creates Scene Object
  scene = new THREE.Scene();

  //Create Camera to view scene
  // Can use camera.position to adjust view angle
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);

  //Creates renderer to create cube
  renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);

  //Texture to load onto object
  texture = new THREE.TextureLoader().load('dino.jpg');

  document.body.appendChild(renderer.domElement);


  //Making the Object

  //Making a a box outline
  var geometry = new THREE.BoxGeometry(2,2,2);

  //Materials for object
  var matBasic = new THREE.MeshBasicMaterial({color: 0xf07f3a});
  var matPhong = new THREE.MeshPhongMaterial({color: 0x73eb34});
  var matTexture = new THREE.MeshBasicMaterial( {map: texture} )

  //Combines Mats and Geometry to create object
  cube = new THREE.Mesh(geometry, matPhong);
  cube2 = new THREE.Mesh(geometry, matBasic);




  scene.add(cube);
  scene.add(cube2);
  scene.add(new THREE.AmbientLight (0x333333));
  scene.add(new THREE.DirectionalLight( 0xFFFFFF, 0.125));

  camera.position.z = 10;



}

function update() {

  //Requests update to be ran on every open frame on the thread
  requestAnimationFrame(update);

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  cube2.position.x -= 0.1;
  renderer.render(scene, camera);

}

init();
update();
