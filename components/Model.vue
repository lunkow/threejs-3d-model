<script setup>
import { useGLTF, GLTFModel } from '@tresjs/cientos';

const { scene: model, nodes, animations, materials } = await useGLTF('/gltf/belfast2.gltf');
// const { scene: model, nodes, animations, materials } = await useGLTF('/gltf-embeded/belfast2.gltf');
// const modelTexture = await useTexture(['/gltf/'])

console.log(model)
console.log(nodes)
console.log(animations)
console.log(materials)

for (let key in nodes) {
  console.log(nodes[key])

  if (nodes[key]['isMesh'] == true) {
    nodes[key]['castShadow'] = true;
  }

  console.warn(nodes[key])
}
</script>

<template>
  <primitive :object="model" :cast-shadow="true" :receive-shadow="true" :scale="0.5"/>
</template>

<style scoped></style>
