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
          type: "line",
          data: [34, 10, 7, 33, 23, 56, 43, 35, 88, 9],
          smooth: true,
          //拐点样式设置
          itemStyle: {
            opacity: 0,
          },
          //线条样式
          lineStyle: {
            color: "purple",
          },
          //填充颜色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                //0%的颜色
                {
                  offset: 0,
                  color: "purple",
                },
                //100%的颜色
                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              global: false, //缺省值为false
            },
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