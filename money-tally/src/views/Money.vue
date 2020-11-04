<template>
  <Layout class-prefix="layout">

    <number-pad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">

  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import model from '@/model';

  const recordList = model.fetch()


  @Component({
    components: {Tags, Notes, Types, NumberPad}
  })

  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行', '彩票'];
    recordList: RecordItem[] = recordList;
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
      const record2: RecordItem = model.clone(this.record);
      record2.createdAt = new Date();
      this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordListChange() {
      model.save(this.recordList);
    }


  }

</script>

<!--注意这里没有scoped，因为要控制Layout组件里的东西-->
<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
