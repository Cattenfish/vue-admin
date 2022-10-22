<template>
  <div>
    <div class="header">
      <span class="search-header">人均搜索次数</span>
      <i class="el-icon-warning-outline"></i>
    </div>
    <div class="main">
      <span class="main-title">3.1</span>
      <span class="main-content">23.6%</span>

      <i class="el-icon-caret-top" style="color: greenyellow"></i>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
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
          data: [12, 8, 45, 23, 29, 34, 24, 36, 38, 23],
          smooth: true,
          //拐点样式设置
          itemStyle: {
            opacity: 0,
          },
          //线条样式
          lineStyle: {
            color: "orange",
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
                  color: "orange",
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

<style scoped>
.header {
  display: flex;
  align-items: center;
}
.search-header {
  margin-right: 15px;
}
.el-icon-warning-outline {
  transform: rotate(180deg);
}
.main {
  margin: 10px 0px;
}
.main-title {
  margin-right: 30px;
}
.main--content {
  margin-right: 30px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>