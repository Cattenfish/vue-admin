<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div><div class="charts" ref="charts"></div></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      value: "全部渠道",
      data: [],
      data1: [
        { value: 1048, name: "搜索引擎" },
        { value: 735, name: "直接访问" },
        { value: 580, name: "邮件营销" },
        { value: 322, name: "视频广告" },
      ],
      data2: [
        { value: 2138, name: "淘宝" },
        { value: 645, name: "京东" },
        { value: 450, name: "拼多多" },
        { value: 234, name: "抖音" },
      ],
      data3: [
        { value: 823, name: "上海" },
        { value: 345, name: "北京" },
        { value: 432, name: "江苏" },
        { value: 354, name: "浙江" },
        { value: 454, name: "广东" },
      ],
      title: {},
      title1: {
        text: "视频广告",
        subtext: "322",
        left: "center",
        top: "center",
      },
      title2: {
        text: "淘宝",
        subtext: "2138",
        left: "center",
        top: "center",
      },
      title3: {
        text: "上海",
        subtext: "823",
        left: "center",
        top: "center",
      },
    };
  },
  mounted() {
    this.data = this.data1;
    this.title = this.title1;
    this.drawCharts();
  },
  // { value: 10348, name: "淘宝" },
  //                 { value: 345, name: "京东" },
  //                 { value: 450, name: "拼多多" },
  //                 { value: 234, name: "抖音" },
  watch: {
    value() {
      switch (this.value) {
        case "全部渠道":
          this.data = this.data1;
          this.title = this.title1;
          this.drawCharts();
          break;
        case "线上":
          this.data = this.data2;
          this.title = this.title2;
          this.drawCharts();
          break;
        case "门店":
          this.data = this.data3;
          this.title = this.title3;
          this.drawCharts();
          break;
      }
    },
  },
  methods: {
    drawCharts() {
      //初始化echarts实例
      let myChart = echarts.init(this.$refs.charts);
      //配置数据
      myChart.setOption({
        title: this.title,
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "outside",
            },

            labelLine: {
              show: true,
            },
            data: this.data,
          },
        ],
      });
      //绑定事件
      myChart.on("mouseover", (params) => {
        const { name, value } = params.data;
        //重新设置标题
        myChart.setOption({
          title: {
            text: name,
            subtext: value,
          },
        });
      });
    },
  },
};
</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  border-bottom: 1px solid #eee;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>