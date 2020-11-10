<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>

    <ol>
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
        <ol>
          <li v-for="item in group.items" class="record" :key="item.id">

            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>

          </li>
        </ol>
      </li>
    </ol>

  </Layout>
</template>

<style lang="scss" scoped>
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    @extend %item
  }

  .record {
    background: white;
    @extend %item
  }

  .notes{
    margin-right: auto;
    margin-left: 12px;
    color: #999;
  }

</style>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {

    tagString(tags: Tag[]) {    // 标签可以有很多
      const tagsName = tags.map(item => item.name);
      return tags.length === 0 ? '无标签' : tagsName.join(',');
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      type HashTableValue = { title: string; items: RecordItem[] }

      const hashTable: { [key: string]: HashTableValue } = {};   // key 为每天的日期
      for (let i = 0; i < recordList.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const [date, time] = recordList[i].createdAt!.split('T');
        console.log(date);
        hashTable[date] = hashTable[date] || {title: date, items: []};  // 检查，不存在就是空数组
        hashTable[date].items.push(recordList[i]);
      }
      console.log(hashTable);
      return hashTable;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;
  }
</script>

<style scoped lang="scss">
  ::v-deep {
    .type-tabs-item { // ::v-deep 往引入的组件的深的找，找到这个 <Tabs class-prefix="type"里面的li
      background: white;

      &.selected {
        background: #c4c4c4;

        &::after {
          display: none;
        }
      }
    }

    .interval-tabs-item {
      height: 48px;
    }
  }
</style>
