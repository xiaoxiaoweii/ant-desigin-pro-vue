// 对axios进行二次封装
import axios from "axios";
import { notification } from "ant-design-vue";

function request(options) {
  // 封装axios 直接返回想要的数据
  return axios(options)
    .then(res => {
      return res;
      // 出现error 将error抛出
    })
    .catch(error => {
      const {
        response: { status, statusText }
      } = error;
      notification.error({
        // eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            请求错误 <span style="color: red">{status}</span> : {options.url}
          </div>
        ),
        description: statusText
      });
      return Promise.reject(error);
    });
}

export default request;
