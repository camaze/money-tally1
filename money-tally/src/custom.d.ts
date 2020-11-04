type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;     // 数据类型
  createdAt?: Date;   // 类 / 构造函数  加问号表示可以不存在
}