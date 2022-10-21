<template>
  <div class="charts" ref="charts"></div>
</template>
  
  <script>
//引入echarts
import * as echarts from "echarts";
export default {
  name: "",
  mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    //配置数据
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      //系列
      series: [
        {
          type: "bar",
          data: [34, 65, 59, 67, 23, 34, 23, 56, 43, 35, 88, 9, 34, 54],
          color: "#295ec9",
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip: {},
    });
  },
};
</script>
  
  <style>
.charts {
  width: 100%;
  height: 100%;
}
</style>