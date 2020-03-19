// 根据请求的方法返回值
function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [20, 40, 78, 40, 30, 48];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
