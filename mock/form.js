// 根据请求的方法返回值
function chart(method) {
  let res = null;
  switch (method) {
    case "POST":
      res = { message: "OK" };
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
