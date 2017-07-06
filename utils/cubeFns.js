import 'three/CanvasRenderer';
import 'three/Projector';
// console.log(THREE.CanvasRenderer);
// console.log(THREE.Projector);

let camera, scene, renderer, geometry, material, cube, plane;
let targetRotation = 0;
let targetRotationOnMouseDown = 0;
let mouseX = 0;
let mouseXOnMouseDown = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let texture;

const initCube = () => {
    // load a texture
    texture = new THREE.TextureLoader().load( "assets/images/head1.jpg" )
    // creste a scene
    scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xffffff );
    // create geometry
        // create a cube of 10 width/length and height
    // geometry = new THREE.BoxGeometry(10,10,10);
    geometry = new THREE.BoxGeometry(250,150,250);

    // create a MeshBasicMaterial with a loaded texture
    material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });

    // combine the geometry and the material into a mesh
    cube = new THREE.Mesh( geometry, material );
    cube.position.y = 130;
    // add the mesh to the scene
    scene.add( cube );

    // create a camera
    //      Set a Field of View (FOV) of 75 degrees
    //      Set an Aspect Ratio of the inner width divided by the inner height of the window
    //      Set the Near distance at which the camera will start rendering scene objects to 1
    //      Set the Far (draw distance) at which objects will not be rendered to 1000
    // camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 2, 1000);
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );

    // Move the camera 'out' by 30
    // camera.position.z = 30;
    camera.position.y = 100;
    camera.position.z = 300;


    // Create WebGL renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });

    // Set the size of the rendered to the inner width and inner height of the window
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xf0f0f0 );

    // Plane
    var geometryPlane = new THREE.PlaneBufferGeometry( 250, 250 );
    geometryPlane.rotateX( - Math.PI / 2 );
    var materialPlane = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );
    plane = new THREE.Mesh( geometryPlane, materialPlane );
    scene.add( plane );
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    // container.appendChild( renderer.domElement );

    // Add in the created DOM element to the body of the document
    document.body.appendChild( renderer.domElement );

    document.addEventListener('mousedown', onDocumentMouseDown, false);

    window.addEventListener( 'resize', onWindowResize, false );

}

const onWindowResize = () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}





const onDocumentMouseDown = (ev) => {
    ev.preventDefault();

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mouseout', onDocumentMouseOut, false );
    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
}

const onDocumentMouseMove = ( event ) =>  {
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}

const onDocumentMouseUp = ( event ) =>  {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

const onDocumentMouseOut = ( event ) => {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

const onDocumentTouchStart = ( event ) => {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
}
const onDocumentTouchMove = ( event ) => {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
    }
}


const animate = () => {

    // Call the requestAnimationFrame function on the animate function
    //  (thus creating an infinite loop)
    requestAnimationFrame( animate );

    // Rotate the x position of the cube by 0.03
    // cube.rotation.x += 0.003;
    // Rotate the y position of the cube by 0.02
    // cube.rotation.y += 0.002;

    // Render everything using the created renderer, scene, and camera
    // renderer.setClearColor( 0xffffff, 0);
    // renderer.render( scene, camera );
    render();

}


function render() {
    plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
    renderer.render( scene, camera );
}


export { initCube, animate }





// https://www.awwwards.com/creating-3d-cube-a-practical-guide-to-three-js-with-live-demo.html
// https://threejs.org/examples/canvas_geometry_cube.html
// https://github.com/mrdoob/three.js/issues/195
// https://videlais.com/2017/01/13/learning-three-js-part-3-loading-and-using-textures/
// https://jeanlescure.io/blog/threejs-and-css-3d-transforms/

/* new approach */


// var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1,10000);
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xefefef,1);

// document.body.appendChild(renderer.domElement);
// // Create a scene
// var scene = new THREE.Scene();
// // Create a geometry
// //  Create a box (cube) of 10 width, length, and height
// // geometry = new THREE.BoxGeometry( 10, 10, 10 );
// var geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);

// // Create a MeshBasicMaterial with a color white and with its wireframe turned on
// var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true} );

// // Combine the geometry and material into a mesh
// var mesh = new THREE.Mesh( geometry, material );
// // Add the mesh to the scene

// scene.add( mesh );

// camera.position.z = 1500;

// renderer.render(scene, camera)

