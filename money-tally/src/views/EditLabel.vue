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
      <FormItem :value="currentTag.name"
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
  import Tags from '@/components/Money/Tags.vue';


  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    get currentTag() {
      return this.$store.state.currentTag;
    }

    // 找标签，找不到就404

    created() {
      // 通过url拿到id，跳转到编辑标签的界面，用户瞎输入id就跳404
      // tag = store.findTag(this.$route.params.id);
      const id = this.$route.params.id;
      this.$store.commit('fetchTags');    // 必须先拿到，不然刷新报错
      this.$store.commit('setCurrentTag', id);
      if (!this.currentTag) {
        this.$router.replace('/404');
      }
    }

    // FormItem组件中监听了input事件，实时更新标签名
    updateTag(name: string) {
      if (this.currentTag) {   //用户瞎输入路径 /edit/xxx之类的就找不到了
        this.$store.commit('updateTag', {
          id: this.currentTag.id, name
        });
      }
    }

    // 通过id删除标签
    remove() {
      if (this.currentTag) {     // 用户瞎输入id就跳404
        const answer = window.confirm('确认删除标签？');
        if (answer) {
          this.$store.commit('removeTag', this.currentTag.id);
        } else {
          return;
        }
      }

      // const answer = window.confirm('确认删除标签？');
      // if (answer) {
      //   if (this.tag) {
      //     if (store.removeTag(this.tag.id)) {
      //       this.$router.back();
      //     } else {
      //       window.alert('删除失败');
      //     }
      //   }
      // } else {
      //   return;
      // }
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