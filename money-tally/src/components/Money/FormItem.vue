<!--input标签与label-->
<template>
  <div>
    <label class="formItem">
      <span class="name">{{fieldName}}</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="placeHolder"/>
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    @Prop({default: ''}) readonly value!: string;

    @Prop({required: true}) fieldName!: string;
    @Prop() placeHolder?: string;

    // @Watch('value')
    // 第一个参数新value，第二个参数老value    应该不用watch。
    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }

    // onInput(event: KeyboardEvent) {
    //   const input = event.target as HTMLInputElement;
    //   this.value = input.value;
    // }
  }
</script>

<style lang="scss" scoped>
  .formItem {
    font-size: 14px;
    display: flex;
    padding-left: 16px;
    align-items: center;

    .name {
      padding-right: 16px;
    }

    input {
      /*font-size: 14px;*/

      height: 40px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>