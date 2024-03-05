<script setup>
import { OrbitControls, vLightHelper } from '@tresjs/cientos'

import { TresCanvas } from '@tresjs/core'
// import { ref } from 'vue'

const boxRef = shallowRef(null);

const { onLoop } = useRenderLoop();

onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.1
  }
})
</script>

<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <TresCanvas
      clear-color="#82DBC5"
      shadows
      window-size>
    <!-- Your scene here -->
      <TresPerspectiveCamera 
        :position="[0, 0, 20]"
        :look-at="[5, 0, 0]"/>

      <TresMesh
        ref="boxRef"
        :scale="1"
        cast-shadow
        receive-shadow>

        <!-- <TresTorusGeometry :args="[1, 0.5, 16, 32]" /> -->
        <TresBoxGeometry :args="[1, 1, 1, 4, 4, 4]" />
        <!-- <TresMeshBasicMaterial color="orange" /> -->
        <!-- <TresMeshNormalMaterial color="orange" /> -->
        <!-- <TresMeshToonMaterial color="#049ef4" /> -->
        <TresMeshStandardMaterial color="#049ef4" />
      </TresMesh>

      <TresMesh 
        :position="[5, 0, 0]"
        cast-shadow
        receive-shadow>
        <TresSphereGeometry :args="[2, 32, 16, 0, 6.283185307179586, 0, 3.141592653589793]" />
        <!-- <TresMeshBasicMaterial color="orange" wireframe /> -->
        <TresMeshStandardMaterial color="orange" />
      </TresMesh>

      <TresMesh 
        :position="[0, 0, -2.5]"
        receive-shadow
        cast-shadow>
        <TresPlaneGeometry :args="[100, 100, 48, 48]" />
        <TresMeshStandardMaterial color="#ffffff" />
      </TresMesh>


      <!-- <TresAmbientLight :intensity="1" /> -->
      <!-- <TresDirectionalLight color="#FFFFFF" :intensity="1" :shadow="true" :cast-shadow="true" :position="[0, 0, 10]"/> -->
      <TresDirectionalLight ref="directionalLightRef" :args="['white', 1]" :position="[0, 5, 15]" cast-shadow :shadow-mapSize-width="2048" :shadow-mapSize-height="2048" v-light-helper/>

      <TresSpotLight :args="['red', 1]" :distance="15" :decay="2" :penumbra="0.2" :position="[10, 5, 5]" :power="5000" cast-shadow :shadow-mapSize-width="4096" :shadow-mapSize-height="4096"  :shadow-camera-near="0.1" :shadow-camera-far="100" :shadow-radius="10" v-light-helper/>

      <OrbitControls />
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