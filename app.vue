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
      clear-color="#4f4f4f"
      shadows
      window-size>
      <TresPerspectiveCamera :position="[150, 0, 0]" :look-at="[0, 0, 0]"/>
      <OrbitControls />

      <!-- Suspense needs because we use some composable that are asynchronous  -->
      <Suspense>
        <Model/>
      </Suspense>

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