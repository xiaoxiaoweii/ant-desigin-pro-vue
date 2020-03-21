<template>
  <div ref="chartDom" style="height: 400px"></div>
</template>
<script>
// 按需引入
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    // resize防抖处理 防止一定时间内resize执行多次
    this.resize = debounce(this.resize, 300);
  },
  watch: {
    // 监听options
    option(val) {
      this.chart.setOption(val);
    }
    // 深度监听options
    // options: {
    //   handle(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.renderChart();
    // 添加监听事件
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    // 移除监听事件
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption;
    }
  }
};
</script>
