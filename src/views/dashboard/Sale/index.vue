<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <!-- 头部左侧内容  @tab-click="handleClick" -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧 -->
      <div class="right">
        <span @click="setDay" class="rightSelect">今日</span>
        <span @click="setWeek" class="rightSelect">本周</span>
        <span @click="setMonth" class="rightSelect">本月</span>
        <span @click="setYear" class="rightSelect">本年</span>
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="20">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="4">
          <div class="rightSale">
            <h3>门店{{ title }}排名</h3>
            <ul v-if="flag">
              <li>
                <span class="rindex">1</span>
                <span class="rNameBig">肯德基</span>
                <span class="rvalue">342,432</span>
              </li>
              <li>
                <span class="rindex">2</span>
                <span class="rNameBig">麦当劳</span>
                <span class="rvalue">299,232</span>
              </li>
              <li>
                <span class="rindex">3</span>
                <span class="rNameBig">必胜客</span>
                <span class="rvalue">290,343</span>
              </li>
              <li>
                <span>4</span>
                <span class="rName">海底捞</span>
                <span class="rvalue">287,422</span>
              </li>
              <li>
                <span>5</span>
                <span class="rName">西贝莜面村</span>
                <span class="rvalue">234,543</span>
              </li>
              <li>
                <span>6</span>
                <span class="rName">汉堡王</span>
                <span class="rvalue">223,423</span>
              </li>
              <li>
                <span>7</span>
                <span class="rName">真功夫</span>
                <span class="rvalue">213,454</span>
              </li>
              <li>
                <span>8</span>
                <span class="rName">达美乐</span>
                <span class="rvalue">203,492</span>
              </li>
            </ul>
            <ul v-else>
              <li>
                <span class="rindex">1</span>
                <span class="rNameBig">海底捞</span>
                <span class="rvalue">580,292</span>
              </li>
              <li>
                <span class="rindex">2</span>
                <span class="rNameBig">必胜客</span>
                <span class="rvalue">559,032</span>
              </li>
              <li>
                <span class="rindex">3</span>
                <span class="rNameBig">茶百道</span>
                <span class="rvalue">548,920</span>
              </li>
              <li>
                <span>4</span>
                <span class="rName">肯德基</span>
                <span class="rvalue">513,226</span>
              </li>
              <li>
                <span>5</span>
                <span class="rName">麦当劳</span>
                <span class="rvalue">503,332</span>
              </li>
              <li>
                <span>6</span>
                <span class="rName">西贝莜面村</span>
                <span class="rvalue">484,333</span>
              </li>
              <li>
                <span>7</span>
                <span class="rName">德克士</span>
                <span class="rvalue">453,344</span>
              </li>
              <li>
                <span>8</span>
                <span class="rName">一点点</span>
                <span class="rvalue">433,492</span>
              </li>
            </ul>
          </div></el-col
        ></el-row
      >
    </div>
  </el-card>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
import * as dayjs from "dayjs";
export default {
  name: "",
  data() {
    return {
      activeName: "sale",
      myCharts: null,
      date: [],
      xAxisSale: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      yAxisSale: [104, 542, 230, 345, 654, 345, 344, 453, 334, 390, 330, 220],
      xAxisVisit: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      yAxisVisit: [230, 420, 532, 345, 672, 475, 123, 356, 498, 234, 320, 312],
      flag: true,
    };
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts);
    //配置
    this.myCharts.setOption({
      title: { text: this.title + "趋势" },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.xAxisSale,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.yAxisSale,
        },
      ],
    });
  },
  computed: {
    //计算属性值-标题
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  //监听属性
  watch: {
    title() {
      //重新修改图表配置数据
      //图表配置数据可以再次修改
      this.myCharts.setOption({
        title: {
          text: this.title + "趋势",
        },
        xAxis: {
          data: this.title == "销售额" ? this.xAxisSale : this.xAxisVisit,
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: this.title == "销售额" ? this.yAxisSale : this.yAxisVisit,
          },
        ],
      });
      //切换
      this.flag = this.title == "销售额" ? true : false;
    },
  },
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
  font-size: small;
}
.date {
  width: 220px;
  margin: 0px 20px;
}
.right span {
  margin: 0px 8px;
}
.charts {
  width: 100%;
  height: 300px;
}
.rightSale {
  padding: 0px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 10%;
  margin: 10px, 20px !important;
}
.rindex {
  float: left;
  width: 15px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
  font-size: 13px;
}
ul li span {
  margin-right: 4px;
}
.rName {
  font-size: 14px;
}
.rNameBig {
  font-size: 15px;
  font-weight: bolder;
}
.rightSelect {
  cursor: pointer;
}
</style>