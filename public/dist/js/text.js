"use strict";

/* global THREE Detector */
/* eslint-env browser */
/* eslint no-console: 0 */
/* eslint wrap-iife: 0 */

var container = void 0;
var camera = void 0,
    scene = void 0,
    renderer = void 0;
var group = void 0,
    textMesh = void 0,
    textGeo = void 0,
    material = void 0;

var text = "66:66:66";
var height = 10;
var size = 80;
var hover = 30;
var curveSegments = 4;
var bevelThickness = 2;
var bevelSize = 1.5;
var bevelSegments = 3;
var bevelEnabled = true;
var fontMap = {
  "helvetiker": 0,
  "optimer": 1,
  "gentilis": 2,
  "droid/droid_sans": 3,
  "droid/droid_serif": 4
};
var weightMap = {
  "regular": 0,
  "bold": 1
};
var fontIndex = 1;
var font = void 0;
var fontName = void 0;
var fontWeight = void 0;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  // title 信息处理
  var info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '10px';
  info.style.width = '100%';
  info.style.color = '#383838';
  info.style.textShadow = '0 0 5px #383838';
  info.style.fontSize = '20px';
  info.style.textAlign = 'center';
  info.innerHTML = 'Welcome ! β-house recruitment coming soon.';
  container.appendChild(info);

  // camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 800);
  camera.position.set(0, 250, 500);

  // scene
  scene = new THREE.Scene();

  // get text
  text = getTime();
  setInterval(timeChange, 1000);

  material = new THREE.MultiMaterial([new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, overdraw: 0.5 }), new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff - 0x100000, overdraw: 0.5 })]);

  group = new THREE.Group();

  scene.add(group);

  fontName = 'helvetiker';
  fontWeight = 'bold';

  loadFont();

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xf0f0f0);
  // renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);
}

// get time
function getTime() {
  var target = [3, 26, 18, 0];
  var now = new Date();

  var day = target[1] - now.toString().split(' ')[2];
  var hour = day * 24 + (target[2] - now.getHours());
  var minute = target[3] - now.getMinutes();
  if (minute <= 0) {
    hour -= 1;
    minute += 59;
  }
  var second = 60 - now.getSeconds();
  return hour + ":" + minute + ":" + second;
}
function timeChange() {
  var t = text.split(':');
  if (t[2] !== '0') {
    t[2] -= 1;
  } else if (t[1] !== '0') {
    t[2] = '59';
    if (t[1] !== '0') {
      t[1] -= 1;
    } else {
      t[1] = '59';
      if (t[0] !== '0') {
        t[0] -= 1;
      }
    }
  }
  console.log('time chaged');
  console.log(text);
  text = t[0] + ":" + t[1] + ":" + t[2];
}

// event handle functions
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 5;
  mouseY = (event.clientY - windowHalfY) / 5;
}

// font handle function
function loadFont() {
  var loader = new THREE.FontLoader();
  loader.load('fonts/' + fontName + '_' + fontWeight + '.typeface.json', function (response) {
    font = response;
    refreshText();
  });
}
function createText() {
  textGeo = new THREE.TextGeometry(text, {
    font: font,
    size: size,
    height: height,
    curveSegments: curveSegments,
    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelEnabled: bevelEnabled,
    material: 0,
    extrudeMaterial: 1
  });
  textGeo.computeBoundingBox();
  textGeo.computeVertexNormals();
  if (!bevelEnabled) {
    var triangleAreaHeuristics = 0.1 * (height * size);
    for (var i = 0; i < textGeo.faces.length; i++) {
      var face = textGeo.faces[i];
      if (face.materialIndex === 1) {
        for (var j = 0; j < face.vertexNormals.length; j++) {
          face.vertexNormals[j].z = 0;
          face.vertexNormals[j].normalize();
        }
        var va = textGeo.vertices[face.a];
        var vb = textGeo.vertices[face.b];
        var vc = textGeo.vertices[face.c];
        var s = THREE.GeometryUtils.triangleArea(va, vb, vc);
        if (s > triangleAreaHeuristics) {
          for (var _j = 0; _j < face.vertexNormals.length; _j++) {
            face.vertexNormals[_j].copy(face.normal);
          }
        }
      }
    }
  }
  var centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
  textMesh = new THREE.Mesh(textGeo, material);
  textMesh.position.x = centerOffset;
  textMesh.position.y = hover - 100;
  textMesh.position.z = 0;
  textMesh.rotation.x = 0;
  textMesh.rotation.y = Math.PI * 2;
  group.add(textMesh);
}
function refreshText() {
  group.remove(textMesh);
  if (!text) return;
  createText();
}
// animate
function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.15;
  camera.position.y += (-mouseY - camera.position.y) * 0.15;
  camera.lookAt(scene.position);

  renderer.clear();
  renderer.render(scene, camera);
}
function animate() {
  requestAnimationFrame(animate);
  refreshText();
  render();
}
//# sourceMappingURL=text.js.map