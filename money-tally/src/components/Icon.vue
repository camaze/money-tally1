<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="'#'+name"/>
  </svg>
</template>

<script lang="ts">
  // 引入整个目录的svg 省的写几个import
  let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}

  export default {
    name: 'Icon',
    props: ['name']
  };
</script>

<style lang="scss" scoped>
  /*icon font 推荐配置*/
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>