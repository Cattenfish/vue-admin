<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>百度</el-dropdown-item>
            <el-dropdown-item>淘宝</el-dropdown-item>
            <el-dropdown-item>微博</el-dropdown-item>
            <el-dropdown-item>小红书</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12"><LineCharts></LineCharts></el-col>
        <el-col :span="12"><PersonLineCharts></PersonLineCharts></el-col>
      </el-row>
      <!-- table表格   :default-sort="{ prop: 'date', order: 'descending' }"  :formatter="formatter"-->
      <el-table
        class="table"
        :data="tableData"
        style="height: 215px"
        border
        :row-style="{ height: '52px' }"
      >
        <el-table-column label="排名" width="80" type="index">
        </el-table-column>
        <el-table-column prop="keyword" label="搜索关键字" width="180">
        </el-table-column>
        <el-table-column prop="num" label="用户数" sortable> </el-table-column>
        <el-table-column prop="rate" label="周涨幅" sortable> </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
import LineCharts from "./LineCharts";
import PersonLineCharts from "./PersonLineCharts";
export default {
  name: "",
  data() {
    return {
      tableData: [
        { keyword: "价格", num: "425", rate: "17%" },
        { keyword: "实惠", num: "422", rate: "13%" },
        { keyword: "好看", num: "123", rate: "3%" },
        { keyword: "便宜", num: "312", rate: "34%" },
      ],
    };
  },
  components: {
    LineCharts,
    PersonLineCharts,
  },
};
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
.header {
  border-bottom: 1px solid #eee;
  padding: 5px, 0px;
}

.el-dropdown-link {
  cursor: pointer;
}
</style>