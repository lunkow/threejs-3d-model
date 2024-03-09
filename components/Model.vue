<script setup>
import { useGLTF, GLTFModel } from '@tresjs/cientos';

const { scene: model, nodes, animations, materials, textures } = await useGLTF('/gltf/belfast2.gltf');
// const { scene: model, nodes, animations, materials } = await useGLTF('/gltf-embeded/belfast2.gltf');
// const modelTexture = await useTexture(['/gltf/'])

console.log(model)
console.log(nodes)
console.log(animations)
console.log(materials)
console.log(textures)
</script>

<template>
  <primitive :object="model" 
    receive-shadow
    cast-shadow/>

</template>

<style scoped></style>
