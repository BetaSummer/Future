/* global THREE Detector */
/* eslint-env browser */
/* eslint no-console: 0 */
/* eslint wrap-iife: 0 */


let container;
let camera, scene, renderer;
let group, textMesh, textGeo, material;

let text = "66:66:66";
let height = 10;
let size = 80;
let hover = 30;
let curveSegments = 4;
let bevelThickness = 2;
let bevelSize = 1.5;
let bevelSegments = 3;
let bevelEnabled = true;
let fontMap = {
  "helvetiker": 0,
  "optimer": 1,
  "gentilis": 2,
  "droid/droid_sans": 3,
  "droid/droid_serif": 4
};
let weightMap = {
  "regular": 0,
  "bold": 1
};
let fontIndex = 1;
let font;
let fontName;
let fontWeight;

let mouseX = 0;
let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // title 信息处理
  const info = document.createElement( 'div' );
  info.style.position = 'absolute';
  info.style.top = '10px';
  info.style.width = '100%';
  info.style.color = '#383838';
  info.style.textShadow = '0 0 5px #383838';
  info.style.fontSize = '20px';
  info.style.textAlign = 'center';
  info.innerHTML = 'Welcome ! β-house recruitment coming soon.';
  container.appendChild( info );

  // camera
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 800 );
  camera.position.set( 0, 250, 500 );

  // scene
  scene = new THREE.Scene();

  // get text
  text = getTime();
  setInterval(timeChange, 1000)

  material = new THREE.MultiMaterial( [
    new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } ),
    new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff - 0x100000, overdraw: 0.5 } )
  ] );

  group = new THREE.Group();

  scene.add( group );

  fontName = 'helvetiker';
  fontWeight = 'bold';

  loadFont();

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xf0f0f0 );
  // renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  window.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'resize', onWindowResize, false );
}

// get time
function getTime() {
  const target = [3, 26, 18, 0];
  const now =  new Date();

  const day = target[1] - now.toString().split(' ')[2];
  let hour = day * 24 + (target[2] - now.getHours());
  let minute = target[3] - now.getMinutes();
  if (minute <= 0) {
    hour -= 1;
    minute += 59;
  }
  const second = 60 - now.getSeconds();
  return `${hour}:${minute}:${second}`;
}
function timeChange() {
  const t = text.split(':');
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
  text = `${t[0]}:${t[1]}:${t[2]}`;
}

// event handle functions
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 5;
  mouseY = (event.clientY - windowHalfY) / 5;
}


// font handle function
function loadFont() {
  const loader = new THREE.FontLoader();
  loader.load( 'fonts/' + fontName + '_' + fontWeight + '.typeface.json', function ( response ) {
    font = response;
    refreshText();
  } );
}
function createText() {
  textGeo = new THREE.TextGeometry( text, {
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
  if ( ! bevelEnabled ) {
    const triangleAreaHeuristics = 0.1 * ( height * size );
    for ( let i = 0; i < textGeo.faces.length; i ++ ) {
      const face = textGeo.faces[ i ];
      if ( face.materialIndex === 1 ) {
        for ( let j = 0; j < face.vertexNormals.length; j ++ ) {
          face.vertexNormals[ j ].z = 0;
          face.vertexNormals[ j ].normalize();
        }
        const va = textGeo.vertices[ face.a ];
        const vb = textGeo.vertices[ face.b ];
        const vc = textGeo.vertices[ face.c ];
        const s = THREE.GeometryUtils.triangleArea( va, vb, vc );
        if ( s > triangleAreaHeuristics ) {
          for ( let j = 0; j < face.vertexNormals.length; j ++ ) {
            face.vertexNormals[ j ].copy( face.normal );
          }
        }
      }
    }
  }
  const centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
  textMesh = new THREE.Mesh( textGeo, material );
  textMesh.position.x = centerOffset;
  textMesh.position.y = hover - 100;
  textMesh.position.z = 0;
  textMesh.rotation.x = 0;
  textMesh.rotation.y = Math.PI * 2;
  group.add( textMesh );
}
function refreshText() {
  group.remove( textMesh );
  if ( !text ) return;
  createText();
}
// animate
function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.15;
  camera.position.y += (-mouseY - camera.position.y) * 0.15;
  camera.lookAt(scene.position);

  renderer.clear();
  renderer.render( scene, camera );
}
function animate() {
  requestAnimationFrame( animate );
  refreshText();
  render();
}
