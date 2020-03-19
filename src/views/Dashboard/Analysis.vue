<template>
  <div>
    Analysis 分析页
    <Chart :option="chartOption" style="height: 400px" />
  </div>
</template>
<script>
import request from "../../utils/request";
import Chart from "../../components/Chart";
export default {
  data() {
    return {
      // 图标信息
      chartOption: {}
    };
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
      // // echarts chartOption 赋予为100以内的随机数
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(
      //   () => random(100)
      // );
      // this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  methods: {
    // axios获取chartOption数据
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { ID: 12345 }
      }).then(response => {
        this.chartOption = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: response.data
            }
          ]
        };
      });
    }
  },
  beforeDestroy() {
    // 销毁interval
    clearInterval(this.interval);
  },
  components: {
    Chart
  }
};
</script>
<style scoped></style>
