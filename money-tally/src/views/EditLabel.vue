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
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    tag?: { id: string; name: string } = undefined;

    created() {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(t => t.id === id)[0];
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }

    // FormItem组件中监听了input事件，实时更新标签名
    updateTag(name: string) {
      if (this.tag) {   //用户瞎输入路径 /edit/xxx之类的就找不到了
        tagListModel.update(this.tag.id, name);
      }
    }

    // 通过id删除标签
    remove() {
      const answer = window.confirm('确认删除标签？');
      if (answer) {
        if (this.tag) {
          if (tagListModel.remove(this.tag.id)) {
            this.$router.back();
          }else{
            window.alert('删除失败')
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