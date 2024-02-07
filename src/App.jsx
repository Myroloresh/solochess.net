import { useState, useEffect, useRef } from 'react'
import './App.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import logo from '/tsclogo_white.png';
import chevron from '/chevron.png';
import arrow from '/arrow.png';
import { CSSTransition } from 'react-transition-group';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;

renderer.shadowMapEnabled = true;
renderer.shadowMapCullFace = THREE.CullFaceBack;
THREE.ColorManagement.legacyMode = false;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.render(scene,camera);

let lexa;
const textureLoader = new THREE.TextureLoader();
const bodyT = textureLoader.load( 'Body_D.png' );
bodyT.colorSpace = THREE.SRGBColorSpace;
const headT = textureLoader.load( 'T_F_MED_LexaEarlGrey_Head_D.png' );
headT.colorSpace = THREE.SRGBColorSpace;
const hairT = textureLoader.load( 'T_F_MED_LexaEarlGrey_FaceAcc_D.png' );
hairT.colorSpace = THREE.SRGBColorSpace;
const armsT = textureLoader.load( 'Arms_D.png' );
armsT.colorSpace = THREE.SRGBColorSpace;
const legsT = textureLoader.load( 'Legs_D.png' );
legsT.colorSpace = THREE.SRGBColorSpace;
const botT = textureLoader.load( 'CandidBikini_BottomB1.jpg' );
botT.colorSpace = THREE.SRGBColorSpace;
const braT = textureLoader.load( 'CandidBikini_BraB1.jpg' );
braT.colorSpace = THREE.SRGBColorSpace;

let first = new Boolean(true);
let count = 0;

const loader = new FBXLoader();
loader.load( './LexaBeach1.FBX', (lexa) => {
  lexa.traverse(child => {
    if (child.isMesh){
      console.log(child.material)
      if(count == 0)
      {
        child.material.map = hairT;
        child.material.normalMap = new THREE.TextureLoader().load( "T_F_MED_LexaEarlGrey_FaceAcc_D.png" );
        child.material.specularMap = new THREE.TextureLoader().load( "T_F_MED_LexaEarlGrey_FaceAcc_S.png" );
        child.material.color = null;
      }
      if(count == 2 || count == 6)
      {
        child.material.map = new THREE.TextureLoader().load( "Excella_teethtongue.jpg" );
        child.material.normalMap = new THREE.TextureLoader().load( "Excella_teethtongue_n.jpg" );
        child.material.color = null;
      }
      //child.material = material;
      if(child.material.length == 8)
      {
        console.log('YAYAYYA')

        child.material[0].map = headT;
        child.material[0].color = null;
        child.material[1].map = bodyT;
        child.material[1].color = null;
        child.material[2].map = bodyT;
        child.material[3].map = bodyT;
        child.material[4].map = armsT;
        child.material[4].color = null;
        child.material[5].map = legsT;
        child.material[5].color = null;
        child.material[0].normalMap = new THREE.TextureLoader().load( "T_F_MED_LexaEarlGrey_Head_N.png" );
        child.material[1].normalMap = new THREE.TextureLoader().load( "Body_N.png" );
        child.material[2].normalMap = new THREE.TextureLoader().load( "Body_N.png" );
        child.material[3].normalMap = new THREE.TextureLoader().load( "Body_N.png" );
        child.material[4].normalMap = new THREE.TextureLoader().load( "Arms_N.png" );
        child.material[5].normalMap = new THREE.TextureLoader().load( "Legs_N.png" );
        child.material[6].color = '0x000000';
        console.log(child.material)
      }
      if(child.material.length == 2)
      {
        if(first)
        {
          console.log('YAYAYYA2')
          child.material[0].map = headT;
          child.material[0].color = null;
          child.material[1].map = headT;
          child.material[1].color = null;
          first = false;
        }
        else{

        }
      }
      count++;
    }
  })
  lexa.scale.x = .2;
  lexa.scale.y = .2;
  lexa.scale.z = .2;
  lexa.position.z = 0;
  lexa.position.x = 5;
  lexa.rotation.y = -45;
  scene.add(lexa);
},
(xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
(error) => {
  console.log(error)});

//const adrian = textureLoader.load('/ADRIANENDOPAFAKER.jpg');
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial();
let tsc = new THREE.Mesh(geometry, material);

const GLTFL = new GLTFLoader;
GLTFL.load('tsc.glb', function(gltf){
  tsc = gltf.scene;
  console.log(tsc);
  tsc.children[0].material.emissive.r = '255';
  tsc.children[0].material.emissive.g = '255';
  tsc.children[0].material.emissive.b = '255';
  tsc.rotation.x += 90;
  tsc.position.y = 15;
  scene.add(tsc);
}, // called while loading is progressing
function ( xhr ) {

  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

  console.log( 'An error happened' );

});

//scene.add(torus)

//const pointLight = new THREE.PointLight(0xFFFFFF, 500, 20000, .5)
//pointLight.position.set(150, 100, -80)
//const ambientLight = new THREE.AmbientLight(0xFFFFFF, 5)
//                                    sky color ground color intensity 
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 2 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );

//const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 ); 

const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 50 );
scene.add( dirLight );

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 50;

dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;

dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;

//const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
//scene.add( dirLightHelper );
//scene.add(hemiLightHelper);

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
const bgTexture = new THREE.TextureLoader().load('beach.png');
scene.background = bgTexture;

//RESIZE WINDOW
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
function render() {
  renderer.render(scene, camera)
}

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  console.log(t);
  const x = 150+t;
  //camera.rotation.y = t*-.01;
  //camera.position.x = t*-((400+t)/400);
  //camera.position.z = 30+(t*.005);
  camera.position.z = Math.cos(t*.01) * 30;
  camera.position.x = Math.sin(t*.01) * 30;
  camera.lookAt(new THREE.Vector3(0,0,0));
}
document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate);
  tsc.rotation.x += 0.01;
  tsc.rotation.y += .005;
  tsc.rotation.z += 0.01;
  renderer.render(scene, camera);
}
animate()

function App() {
  const [count, setCount] = useState(0)

  

  return (
    <>
      <div className="midSection">
        <div>
          <a>
            <img src='welcome.png' className="logo"/>
          </a>
          <MenuIcon icon ={logo}>
            <DropdownMenu></DropdownMenu>
          </MenuIcon>
        </div>
        <h1>TEAM SOLO CHESS</h1>
        <p>
          Working on bringing you the best Fortnite games.
        </p>
        <p>
          Like tycoons?
        </p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            click for cash: ${count}
          </button>
          <p>
            Epic Fortnite wins
          </p>
        </div>
        <p>
          info.txt
        </p>
      </div>
    </>
  )
}

//DROPDOWN MENU
//icon to open menu
function MenuIcon(props){
  const[open, setOpen] = useState(false);

  //make it so menu closes if click anywhere else
  let menuRef = useRef();
  useEffect(() => {let handler = (e) => { if(!menuRef.current.contains(e.target))
    {
      setOpen(false);
      console.log(menuRef.current);
    }
  };
  document.addEventListener("mousedown", handler);
});

  return(
    <>
    <a href="#" onClick={() => setOpen(!open)}>
      <img src={props.icon} className="logo tsc" alt="React logo" />
    </a>
    <div ref={menuRef}>
      {open && props.children}
    </div>
    </>
  );
}
//menu
function DropdownMenu(){
  const [activeMenu, setActiveMenu] = useState('main'); //starts with main menu active. can be changed to sub menus
  const [menuHeight, setMenuHeight] = useState(null);

  function calculateHeight(element){
    const height = element.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props){
    return(
      <a href="#" className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>

        {props.children}

        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return(
    <div className="dropdown" style={{height: menuHeight}}>
    <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calculateHeight}>
      <div className='menu'>
        <DropdownItem rightIcon={<img src={chevron} className='icon-right'/>} goToMenu="fortniteGames">Fortnite Games</DropdownItem>
        <DropdownItem>Socials</DropdownItem>
        <DropdownItem>About</DropdownItem>
      </div>
    </CSSTransition>
    <CSSTransition in={activeMenu === 'fortniteGames'} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calculateHeight}>
      <div className='menu'>
        <DropdownItem leftIcon={<img src={arrow} className='icon-left'/>} goToMenu="main">Back</DropdownItem>
        <DropdownItem>Anime Beach Tycoon</DropdownItem>
      </div>
    </CSSTransition>
    </div>
  );
}

export default App
