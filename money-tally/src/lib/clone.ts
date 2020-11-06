// 深拷贝
function clone(data: any) {
  return JSON.parse(JSON.stringify(data));
}

export default clone;