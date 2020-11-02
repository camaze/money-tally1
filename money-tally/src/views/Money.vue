<template>
  <Layout class-prefix="layout">
    <number-pad/>
    <Types :xxx="333"/>
    <Notes/>
    <Tags/>
  </Layout>
</template>

<script lang="ts">

  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  export default {
    name: 'Money',
    components: {Tags, Notes, Types, NumberPad},
  };
</script>

<!--注意这里没有scoped，因为要控制Layout组件里的东西-->
<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>
