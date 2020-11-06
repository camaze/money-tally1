<template>
  <Layout class-prefix="layout">
    {{recordList}}
    <!--    点击OK后submit提交，并执行saveRecord-->
    <number-pad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注"
                place-holder="在这里输入备注"
                @update:value="onUpdateNotes"
      />
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">

  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import store from '@/store/index2';

  @Component({
    components: {Tags, FormItem, Types, NumberPad}
  })

  export default class Money extends Vue {
    // tags = ['衣', '食', '住', '行', '彩票'];
    tags = store.tagList;
    recordList = store.recordList;
    // 记账记录：默认一打开界面是如下情况
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      store.createRecord(this.record);
    }

    // @Watch('recordList')    // watch已经没用，留着回头参考。。
    // onRecordListChange() {
    //   recordListModel.save();
    // }
  }
</script>

<!--注意这里没有scoped，因为要控制Layout组件里的东西-->
<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .notes {
    padding: 12px 0;
  }
</style>
