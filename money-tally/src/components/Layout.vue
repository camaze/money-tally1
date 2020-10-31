<!--几种状态都会用到的布局减少重复-->
<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  import Nav from './Nav.vue'
  export default {
    name: 'Layout',
    components:{Nav}
  };
</script>

<style lang="scss" scoped>
  .nav-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .content {
    flex-grow: 1;
    overflow: auto;
  }
</style>