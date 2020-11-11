<template>
  <Layout class-prefix="layout">
    <!--    点击OK后submit提交，并执行saveRecord-->
    <number-pad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注"
                place-holder="在这里输入备注"
                @update:value="onUpdateNotes"
      />
    </div>
    <Tags @update:value="onSelectedTags"/>
  </Layout>
</template>

<script lang="ts">

  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import Tabs from '@/components/Tabs.vue';
  // import oldStore from '@/store/index2';


  @Component({
    components: {Tabs, Tags, FormItem, NumberPad},
  })
  export default class Money extends Vue {

    get recordList() {
      return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;

    // 记账记录：默认一打开界面是如下情况
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };

    created() {
      this.$store.commit('fetchRecords');
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    onSelectedTags(tags: Tag[]) {
      this.record.tags = tags;
    }

    // 储存一条记录
    saveRecord() {
      this.$store.commit('createRecord', this.record);
    }


    // @Watch('recordList')    // watch已经没用，留着回头参考。。
    // onRecordListChange() {
    //   recordListModel.save();
    // }
  }
</script>

<!--注意这里没有scoped，因为要控制Layout组件里的东西-->
<!--写成scoped也没有影响？？？   ...有的-->
<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .notes {
    padding: 12px 0;
  }
</style>
