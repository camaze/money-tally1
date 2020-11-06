<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">
        编辑标签
      </span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="updateTag"
                field-name="标签名"
                place-holder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';
  import store from '@/store/index2';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    tag = store.findTag(this.$route.params.id);

    created() {
      console.log('aaaa', this.$route.params.id)
      console.log(this.tag);
      // 通过url拿到id，跳转到编辑标签的界面，用户瞎输入id就跳404
      if (!this.tag) {
        this.$router.replace('/404');
      }
    }

    // FormItem组件中监听了input事件，实时更新标签名
    updateTag(name: string) {
      if (this.tag) {   //用户瞎输入路径 /edit/xxx之类的就找不到了
        store.updateTag(this.tag.id, name);
      }
    }

    // 通过id删除标签
    remove() {
      const answer = window.confirm('确认删除标签？');
      if (answer) {
        if (this.tag) {
          if (store.removeTag(this.tag.id)) {
            this.$router.back();
          } else {
            window.alert('删除失败');
          }
        }
      } else {
        return;
      }
    }

    goBack() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .leftIcon {
      width: 20px;
      height: 20px;
    }

    > .title {

    }

    > .rightIcon {
      width: 20px;
      height: 20px;
    }
  }

  .form-wrapper {
    background: white;
    margin-top: 8px;
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
</style>