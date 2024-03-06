<script setup>
// ! https://docs.tresjs.org/api/composables#:~:text=%7B%20camera%2C-,renderer,-%2C%20camera%2C
// !! https://github.com/mrdoob/three.js/blob/master/examples/webgl_shaders_ocean.html#L111C5-L111C34

// ! https://docs.tresjs.org/api/composables#usetexture - для нормалей воды

import { OrbitControls, vLightHelper } from '@tresjs/cientos'
import { TresCanvas, useTresContext, useTresContextProvider } from '@tresjs/core'

import { ref } from 'vue'

import { DoubleSide } from 'three';

const tresCanvasRef = shallowRef(null);
const planeRef = shallowRef(null);
const lightRef2 = shallowRef(null);


// const { onLoop } = useRenderLoop();

// onLoop(({ delta, elapsed }) => {
//   if (planeRef.value) {
//     // sphereRef.value.rotation.y += delta
//     // sphereRef.value.rotation.z = elapsed * 0.1
//     // planeRef.value.position.y = Math.sin(elapsed);
//   }

//   if (lightRef2.value) {
//     lightRef2.value.position.z = 2 * Math.sin(elapsed);
//   }
// })



// WaterShader vue

// https://github.com/mrdoob/three.js/blob/master/examples/webgl_shaders_ocean.html
// https://threejs.org/examples/?q=ocea#webgl_shaders_ocean
// https://docs.tresjs.org/cookbook/shaders.html#shadermaterial


import { Water } from '/node_modules/three/examples/jsm/objects/Water.js';
import { Sky } from '/node_modules/three/examples/jsm/objects/Sky.js';

import { PlaneGeometry, TextureLoader, RepeatWrapping, Vector3, Scene, MathUtils, PMREMGenerator, Mesh, WebGLRenderer} from 'three';

import waternormals from '/components/waternormals.jpg';

console.warn(waternormals)

import { useGLTF, GLTFModel } from '@tresjs/cientos';
// import { OrbitControls, vLightHelper } from '@tresjs/cientos'

let water, sun, mesh;


// Water
// const waterGeometry = new PlaneGeometry( 10000, 10000 );

// water = new Water(
//   waterGeometry,
//   {
//     textureWidth: 512,
//     textureHeight: 512,
//     waterNormals: new TextureLoader().load( '/node_modules/three/examples/textures/waternormals.jpg', function ( texture ) {
//       texture.wrapS = texture.wrapT = RepeatWrapping;
//     } ),
//     sunDirection: new Vector3(),
//     sunColor: '#ffffff',
//     waterColor: '#001e0f',
//     distortionScale: 1.7,
//     // fog: scene.fog !== undefined
//   }
// );

// water.rotation.x = - Math.PI / 2;



// Skybox

// const sky = new Sky();

// sky.scale.setScalar( 10000 );

// const skyUniforms = sky.material.uniforms;

// skyUniforms[ 'turbidity' ].value = 10;
// skyUniforms[ 'rayleigh' ].value = 2;
// skyUniforms[ 'mieCoefficient' ].value = 0.005;
// skyUniforms[ 'mieDirectionalG' ].value = 0.8;

// const parameters = {
//   elevation: 2,
//   azimuth: 180
// };

// // const pmremGenerator = new PMREMGenerator( renderer );
// const sceneEnv = new Scene();

// let renderTarget;

// function updateSun() {

//   const phi = MathUtils.degToRad( 90 - parameters.elevation );
//   const theta = MathUtils.degToRad( parameters.azimuth );

//   sun.setFromSphericalCoords( 1, phi, theta );

//   sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
//   water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

//   if ( renderTarget !== undefined ) renderTarget.dispose();

//   // sceneEnv.add( sky );
//   renderTarget = pmremGenerator.fromScene( sceneEnv );
//   // scene.add( sky );

//   scene.environment = renderTarget.texture;

// }

// updateSun();



// Sun
sun = new Vector3();


const { onLoop } = useRenderLoop();
const waterRef = ref(null);
const boxRef = ref(null);

onLoop(({ delta, elapsed }) => {
  // if (planeRef.value) {
    // sphereRef.value.rotation.y += delta
    // sphereRef.value.rotation.z = elapsed * 0.1
    // planeRef.value.position.y = Math.sin(elapsed);
  // }

  if (boxRef.value) {
    boxRef.value.position.y = Math.sin( elapsed ) * 20 + 5;
    boxRef.value.rotation.x = elapsed * 0.5;
    boxRef.value.rotation.z = elapsed * 0.51;
  }

  // if (waterRef.value) {
    // lightRef2.value.position.z = 2 * Math.sin(elapsed);
    // waterRef.value.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    // water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    // console.log(waterRef.value.material)

    // waterRef.value.material.uniforms[ 'time' ].value += delta;
    // waterRef.value.material.uniforms[ 'time' ].value += 1.0 / 60.0;
  // }

})


// try 2
// const meshSkyWithMaterial = new Mesh(geometry, material); // example from docs
const meshSkyWithMaterial = new Sky(); // example from docs
meshSkyWithMaterial.scale.setScalar(10000);

const skyMaterialUniforms = meshSkyWithMaterial.material.uniforms;

skyMaterialUniforms[ 'turbidity' ].value = 10;
skyMaterialUniforms[ 'rayleigh' ].value = 2;
skyMaterialUniforms[ 'mieCoefficient' ].value = 0.005;
skyMaterialUniforms[ 'mieDirectionalG' ].value = 0.8;

console.log('------ meshSkyWithMaterial')
console.log(meshSkyWithMaterial)

// temp
const parameters = {
  elevation: 2,
  azimuth: 180
};


// const pmremGenerator = new PMREMGenerator(tresCanvasRef.value.renderer);

// update sun
const phi = MathUtils.degToRad( 90 - parameters.elevation );
const theta = MathUtils.degToRad( parameters.azimuth );

sun.setFromSphericalCoords( 1, phi, theta );
// console.log('sun')
// console.log(sun)

meshSkyWithMaterial.material.uniforms[ 'sunPosition' ].value.copy(sun);

// later - sun for water
// water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();


// try 2 - water
const meshWaterGeometry = new PlaneGeometry( 10000, 10000 );
const meshWaterMaterial = {
  textureWidth: 512,
  textureHeight: 512,
  // waterNormals: new TextureLoader().load( '/components/waternormals.jpg', function ( texture ) {
  //   texture.wrapS = texture.wrapT = RepeatWrapping;
  // } ),
  sunDirection: new Vector3(),
  sunColor: 0xffffff,
  waterColor: 0x001e0f,
  distortionScale: 5,
  fog: false // scene.fog !== undefined
}

const meshWaterWithMaterial = new Water(meshWaterGeometry, meshWaterMaterial); // example from docs
meshWaterWithMaterial.rotation.x = - Math.PI / 2;
console.log(meshWaterWithMaterial)

meshWaterWithMaterial.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();


let renderTarget;

if ( renderTarget !== undefined ) renderTarget.dispose();

// WebGLRenderer
// tresCanvasRef
// const pmremGenerator = new THREE.PMREMGenerator( renderer ); 

// const newRenderer = new WebGLRenderer;
// const pmremGenerator = new PMREMGenerator( new WebGLRenderer );

onMounted(() => {
  console.log('TresCanvas')
  console.log(TresCanvas)

  // console.log('useRenderer')
  // console.log(useRenderer)

  // const { renderer } = useRenderer();

  // const { camera, renderer, cameras } = useTresContext()
  // const context = useTresContext()

  // console.log(context)
  
})


</script>

<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <TresCanvas
      ref="tresCanvasRef"
      shadows
      window-size>
      <TresPerspectiveCamera :position="[150, 50, 0]" :look-at="[0, 0, 0]"/>
      <OrbitControls />
      <!-- <MapControls /> -->
      <!-- <TransformControls :object="lightRef" /> -->
      <TresGridHelper />
      <TresAxesHelper :args="[100]" />

      <!-- Suspense needs because we use some composable that are asynchronous  -->
      <!-- <Suspense>
        <Model/>
      </Suspense> -->

      <!-- <TresMesh
        ref="planeRef"
        :position="[0, 0, 0]"
        :rotation="[Math.PI / 2, 0, Math.PI / 4]"
        receive-shadow
        cast-shadow>
        <TresPlaneGeometry :args="[300, 300, 48, 48]" />
        <TresMeshStandardMaterial color="#ffffff" :side="DoubleSide" :wireframe="false"/>
      </TresMesh> -->

      <TresMesh 
        :position="[20, 5, 0]"
        cast-shadow
        receive-shadow>
        <TresSphereGeometry :args="[2, 32, 16, 0, 6.283185307179586, 0, 3.141592653589793]" />
        <TresMeshStandardMaterial color="orange" />
      </TresMesh>


      <!-- <TresAmbientLight ref="lightRef" :args="['#404040', 0.4]"/> -->
      <TresAmbientLight ref="lightRef3" :args="['#404040', 1]"/>
      <TresPointLight ref="lightRef2" :args="['#404040', 800, 0]" :position="[40, 20, 10000]" cast-shadow v-light-helper/>
      
      <!-- <TresSpotLight :args="['white', 1]" :distance="50" :decay="2" :penumbra="0.2" :position="[30, 25, 0]" :power="5000" cast-shadow v-light-helper/> -->



      <!-- Water Shader vue -->
      <!-- Water Shader vue -->
      <!-- Water Shader vue -->
      <!-- Water Shader vue -->

      <primitive :object="meshSkyWithMaterial" />
      <primitive :object="meshWaterWithMaterial" />
      <!-- <primitive :object="sceneEnv" /> -->

      <!-- Water -->
      <!-- <primitive ref="waterRef" :object="water" :rotation="[-Math.PI / 2, 0, 0]"/> -->
      <!-- <TresMesh
        ref="waterRef">
        <TresBoxGeometry :args="[30, 30, 30]" />
        <TresMeshStandardMaterial :roughness="0" />

      </TresMesh> -->

      <!-- Box -->
      <TresMesh
        ref="boxRef">
        <TresBoxGeometry :args="[30, 30, 30]" />
        <TresMeshStandardMaterial :roughness="0" />
      </TresMesh>

      <!-- sun -->
      <!-- <TresMesh
        ref="sunRef">
        <TresSphereGeometry :args="[30, 30, 30]" />
        <TresMeshStandardMaterial :roughness="0" />
      </TresMesh> -->

    </TresCanvas>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>