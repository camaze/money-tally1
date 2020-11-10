<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>

    <ol>
      <!--      <li v-for="(group, index) in result" :key="index">-->
      <li v-for="group in result" :key="group.title">
        <h3 class="title">{{beautify(group.title)}}</h3>
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

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';

  const oneDay = 86400 * 1000;

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {

    tagString(tags: Tag[]) {    // 标签可以有很多
      const tagsName = tags.map(item => item.name);
      return tags.length === 0 ? '无标签' : tagsName.join(',');
    }

    beautify(string: string) {
      // console.log(string);    // 2020-11-08
      const day = dayjs(string);    // 拿到的title里的数据转换为dayjs示例
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');        // 当年的记录不加年
      } else {
        return day.format('YYYY年M月D日');  // 之前的记录加年
      }
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      type HashTableValue = { title: string; items: RecordItem[] }

      // hashTable 最后为{时间1: {title: date1, items: [record1, record2] }, 时间2: {title: date2, items: [record3, record4]}}

      const hashTable: { [key: string]: HashTableValue } = {};   // key 为每天的日期
      for (let i = 0; i < recordList.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const [date, time] = recordList[i].createdAt!.split('T');   // 当天作key
        console.log(date);
        hashTable[date] = hashTable[date] || {title: date, items: []};  // 检查，存在就不变，准备往这里面push，不存在就是新的一个对象
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

  .notes {
    margin-right: auto;
    margin-left: 12px;
    color: #999;
  }

</style>