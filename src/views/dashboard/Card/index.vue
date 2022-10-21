<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card
          ><Detail title="总销售额" count="￥134568">
            <template slot="charts"
              ><span>周同比&nbsp;&nbsp;58.64%</span>
              <svg
                t="1666251023945"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6469"
                width="16"
                height="16"
              >
                <path
                  d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z"
                  p-id="6470"
                  fill="#d81e06"
                ></path>
              </svg>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;12.33%</span>
              <svg
                t="1666250694906"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6218"
                width="16"
                height="16"
              >
                <path
                  d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z"
                  p-id="6219"
                  fill="#1afa29"
                ></path>
              </svg>
            </template>
            <template slot="footer">
              <span>日销售额￥43221</span>
            </template></Detail
          ></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="访问量" count="6432">
            <template slot="charts"><lineChart></lineChart></template>
            <template slot="footer">
              <span>日访问量 1234</span>
            </template>
          </Detail></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="支付笔数" count="5332">
            <template slot="charts"><barChart></barChart></template
            ><template slot="footer">
              <span>转化率 89%</span>
            </template></Detail
          ></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="运营活动效果" count="79%">
            <template slot="charts"><progressChart></progressChart></template>
            <template id="rate" slot="footer"
              ><span>周同比&nbsp;&nbsp;34%</span>
              <svg
                t="1666251023945"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6469"
                width="16"
                height="16"
              >
                <path
                  d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z"
                  p-id="6470"
                  fill="#d81e06"
                ></path>
              </svg>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;11%</span>
              <svg
                t="1666250694906"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6218"
                width="16"
                height="16"
              >
                <path
                  d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z"
                  p-id="6219"
                  fill="#1afa29"
                ></path>
              </svg>
            </template> </Detail></el-card></el-col
    ></el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineChart from "./LineChart";
import barChart from "./BarChart";
import progressChart from "./ProgressChart";
export default {
  name: "card",
  components: {
    Detail,
    lineChart,
    barChart,
    progressChart,
  },
};
</script>

<style scoped>
</style>