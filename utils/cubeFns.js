// import possible because of alias defined in webpack.config
import 'three/CanvasRenderer';
import 'three/Projector';
import 'three/CSS3DRenderer';

let camera, scene, renderer, geometry, material, cube, plane;
let scene3D, renderer3D, element, div;
let targetRotation = 0;
let targetRotationOnMouseDown = 0;
let mousePosition = 0;
let mousePositionOnMouseDown = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let texture;

const initCube = () => {
    // Texture
    texture = new THREE.TextureLoader().load('assets/images/head1.jpg')
    // Scene
    scene = new THREE.Scene();
    // Cube
    geometry = new THREE.BoxGeometry(250,150,250);
    // Material
    material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
    // Mesh
    cube = new THREE.Mesh( geometry, material );
    cube.position.y = 130;
    scene.add(cube);
    // Camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 100;
    camera.position.z = 300;
    // WebGL renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.zIndex = 5;
    renderer.setClearColor( 0xf0f0f0 );
    // CSS3D Scene
    scene3D = new THREE.Scene();
    // HTML
    element = document.createElement('div');
    element.innerHTML = '<div class="txt"><p>Div w/ text on top of three.js WebGL cube.</p><p>Drag mouse to spin cube.</p></div>';
    element.className = 'three-div';
    // CSS 3DObject
    div = new THREE.CSS3DObject(element);
    div.position.x = 0;
    div.position.y = 0;
    div.position.z = -185;
    scene3D.add(div);
    // CSS3D Renderer
    renderer3D = new THREE.CSS3DRenderer();
    renderer3D.setSize(window.innerWidth, window.innerHeight);
    renderer3D.domElement.style.position = 'absolute';
    renderer3D.domElement.style.top = 30;
    // Plane
    let geometryPlane = new THREE.PlaneBufferGeometry(250, 250);
    geometryPlane.rotateX( - Math.PI / 2 );
    let materialPlane = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );
    plane = new THREE.Mesh( geometryPlane, materialPlane );
    scene.add( plane );
    // Add DOM element to body
    document.body.appendChild( renderer.domElement );
    document.body.appendChild(renderer3D.domElement);
    document.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener( 'resize', onWindowResize, false );
};

const onWindowResize = () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer3D.setSize(window.innerWidth, window.innerHeight);
};

const onMouseDown = (ev) => {
    ev.preventDefault();
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
    document.addEventListener('mouseout', onMouseOut, false);
    mousePositionOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
};

const onMouseMove = (ev) =>  {
    mousePosition = ev.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + (mousePosition - mousePositionOnMouseDown) * 0.02;
};

const onMouseUp = () =>  {
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);
    document.removeEventListener('mouseout', onMouseOut, false);
};

const onMouseOut = () => {
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);
    document.removeEventListener('mouseout', onMouseOut, false);
};

const onDocumentTouchStart = (ev) => {
    if (ev.touches.length === 1) {
        ev.preventDefault();
        mousePositionOnMouseDown = ev.touches[0].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
};

const onTouchMove = (ev) => {
    if (ev.touches.length === 1) {
        ev.preventDefault();
        mousePosition = ev.touches[0].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + (mousePosition - mousePositionOnMouseDown) * 0.05;
    }
};

const animate = () => {
    // infinite loop
    requestAnimationFrame(animate);
    render();
};

function render() {
    plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
    renderer3D.render(scene3D, camera);
    renderer.render(scene, camera);
};

export { initCube, animate };
