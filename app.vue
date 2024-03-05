<script setup>
// import { OrbitControls, vLightHelper } from '@tresjs/cientos'
// import { TresCanvas } from '@tresjs/core'

const sphereRef = ref(null);

const { onLoop } = useRenderLoop();

onLoop(({ delta, elapsed }) => {
  if (sphereRef.value) {
    // sphereRef.value.rotation.y += delta
    // sphereRef.value.rotation.z = elapsed * 0.1
    sphereRef.value.position.y = Math.sin(elapsed);
  }
})

</script>

<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <TresCanvas
      clear-color="black"
      shadows
      window-size>
      <TresPerspectiveCamera />
      <OrbitControls />

      <TresMesh 
        ref="sphereRef"
        :position="[0, 0, 0]"
        cast-shadow
        receive-shadow>
        <TresSphereGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>

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