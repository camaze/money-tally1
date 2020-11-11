// 深拷贝
// function clone(data: any) {
//   return JSON.parse(JSON.stringify(data));
// }
//
// export default clone;

// data是什么类型，我就返回什么类型 T。。
function clone<T>(data: T): T{
  return JSON.parse(JSON.stringify(data));
}

export default clone;