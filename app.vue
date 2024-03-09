<script setup>
import { OrbitControls, vLightHelper } from '@tresjs/cientos'
// import { TresCanvas } from '@tresjs/core'

import { ref } from 'vue'

const sphereRef = ref(null);
const plainRef = ref(null);

// const { onLoop } = useRenderLoop();

// onLoop(({ delta, elapsed }) => {
//   if (plainRef.value) {
//     // sphereRef.value.rotation.y += delta
//     // sphereRef.value.rotation.z = elapsed * 0.1
//     plainRef.value.position.y = Math.sin(elapsed);
//   }
// })

</script>

<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <TresCanvas
      clear-color="#000000"
      shadows
      window-size>
      <TresPerspectiveCamera :position="[150, 0, 0]" :look-at="[0, 0, 0]"/>
      <OrbitControls />

      <!-- Suspense needs because we use some composable that are asynchronous  -->
      <Suspense>
        <Model receive-shadow cast-shadow/>
      </Suspense>

      <!-- <TresMesh 
        ref="plainRef"
        :position="[0, -1, 0]"
        :rotation-x="-Math.PI / 2">
        <TresPlaneGeometry :args="[250, 250, 48, 48]" />
        <TresMeshStandardMaterial color="#ffffff" />
      </TresMesh> -->

      <!-- <TresDirectionalLight ref="directionalLightRef" :args="['white', 1]" :position="[0, 0, 100]" cast-shadow :shadow-mapSize-width="2048" :shadow-mapSize-height="2048" v-light-helper/> -->
      <!-- <TresDirectionalLight ref="directionalLightRef1" :args="['white', 1]" :position="[0, 100, 100]" cast-shadow :shadow-mapSize-width="2048" :shadow-mapSize-height="2048" v-light-helper/> -->
      <!-- <TresDirectionalLight ref="directionalLightRef2" :args="['white', 1]" :position="[0, 100, -100]" cast-shadow :shadow-mapSize-width="2048" :shadow-mapSize-height="2048" v-light-helper/> -->
      <!-- <TresHemisphereLight ref="directionalLightRef3" :args="['0x0000ff', '0x00ff00', 0.9]" v-light-helper/> -->
      <!-- HemisphereLight -->
      <!-- <TresSpotLight :args="['red', 1]" :distance="100" :decay="2" :penumbra="0.2" :position="[50, 50, 10]" :power="7000" cast-shadow :shadow-mapSize-width="4096" :shadow-mapSize-height="4096"  :shadow-camera-near="0.1" :shadow-camera-far="100" :shadow-radius="10" v-light-helper/> -->
      <TresPointLight :args="['white', 1, 0, 2]" :position="[15, 8, -33]" :power="5000" cast-shadow :shadow-mapSize-width="4096" :shadow-mapSize-height="4096"  :shadow-camera-near="0.1" :shadow-camera-far="100" :shadow-radius="10" v-light-helper/>

      <TresGridHelper />
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