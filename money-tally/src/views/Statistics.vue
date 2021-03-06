<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <!--    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>  不搞按天按月按周了-->

    <ol v-if="groupedList.length>0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
        <ol>
          <li v-for="item in group.items" class="record" :key="item.id">

            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>

          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  const oneDay = 86400 * 1000;

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {

    tagString(tags: Tag[]) {    // 标签可以有很多
      const tagsName = tags.map(item => item.name);
      return tags.length === 0 ? '无标签' : tagsName.join('，');
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

    get groupedList() {
      const {recordList} = this;
      // type HashTableValue = { title: string; items: RecordItem[] }  // 用一个数组来放每一项这个[HashRableValue1, HashRableValue2...] 有顺序
      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {return [] as Result;}

      type Result = { title: string; total?: number; items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });

      return result;
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
  .noResult{
    padding: 16px;
    text-align: center;
  }
  ::v-deep {
    .type-tabs-item { // ::v-deep 往引入的组件的深的找，找到这个 <Tabs class-prefix="type"里面的li
      background: #c4c4c4;

      &.selected {
        background: white;

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