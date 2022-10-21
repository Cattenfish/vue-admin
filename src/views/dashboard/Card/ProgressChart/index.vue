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
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      //系列
      series: [
        {
          type: "bar",
          data: [79],
          //柱状体宽度
          barWidth: 10,
          color: "yellowgreen",
          showBackground: true,
          //设置背景颜色
          backgroundStyle: {
            color: "#eee",
          },
          label: {
            show: true,
            position: "right",
          },
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
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