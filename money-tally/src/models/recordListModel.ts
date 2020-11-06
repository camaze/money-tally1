// custom.d.ts 保存定义的Type，是全局的
import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  // 深拷贝,已经改写到lib/clone.ts
  // clone(data: RecordItem[] | RecordItem) {
  //   return JSON.parse(JSON.stringify(data));
  // },

  // 创建一个新的记账记录
  create(record: RecordItem) {
    const record2 = clone(record);
    record2.createdAt = new Date();
    this.data.push(record2);
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },

  save() {
    window.localStorage.setItem(localStorageKeyName,
      JSON.stringify(this.data));
  }

};

export default recordListModel;