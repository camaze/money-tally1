<template>
  <div class="tags">
    <div class="newTag">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id"
          @click="toggle(tag)"
          :class="{selected: selectedTags.indexOf(tag)>=0}">{{tag.name}}
      </li>

    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop(Array) readonly dataSource: string[] | undefined;
    selectedTags: string[] = [];

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {    // 从selectedTags中删除
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags)
    }

    create() {
      const name = window.prompt('请输入新标签');
      if (name === '') {
        window.alert('输入不能为空');
      }
      else if(name === null){   // 新输入新标签后选取消name会为null
        return;
      }else if (this.dataSource) {
        console.log('aaa')
        this.$emit('update:dataSource', [...this.dataSource, name]);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    background: white;
    > .current {
      display: flex;
      flex-wrap: wrap;

      > li {
        $bg: #d9d9d9;
        background: $bg;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;

        &.selected {
          background: darken($bg, 25%);
          color: white;
        }
      }
    }

    > .newTag {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>