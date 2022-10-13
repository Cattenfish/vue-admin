<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 三级联动全局组件 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable">
      </CategorySelect></el-card
    ><el-card>
      <div v-show="scene == 0">
        <!-- 展示spu列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            align="center"
          ></el-table-column>
          <el-table-column type="prop" label="操作" align="center">
            <template slot-scope="{ row, $index }">
              <!--这里按钮将来用hintbutton 替换-->
              <HintButton
                type="success"
                icon="el-icon-plus"
                sizi="mini"
                title="添加spu"
              ></HintButton>
              <HintButton
                type="warning"
                icon="el-icon-edit"
                sizi="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></HintButton>
              <HintButton
                type="info"
                icon="el-icon-info"
                sizi="mini"
                title="查看当前spu全部sku列表"
              ></HintButton>
              <el-button
                type="danger"
                icon="el-icon-delete"
                sizi="mini"
                title="删除spu"
              ></el-button> </template
          ></el-table-column>
        </el-table>

        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="pager, next, jumper,->,total,sizes"
          @size-change="handleSizeChange"
          @current-change="getSpuList"
          :total="20"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SpuForm v-show="scene == 2"></SpuForm>
    </el-card>
  </div>
</template>

<script>
//引入子组件
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      isShowTable: true,
      page: 1, //当前第几页
      limit: 3, //每页展示条数
      records: [], //spu列表的数据
      total: 0, //分页器一个需要展示的数据条数
      scene: 0,
    };
  },
  components: {
    SkuForm,
    SpuForm,
  },
  methods: {
    //三级联动的自定义事件，可以把子组件相应的id传给父组件
    getCategoryId({ categoryId, level }) {
      //区分三级分类相应的ID以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //发请求获取SPU
        this.getSpuList();
      }
    },
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //当分页器的某一一个展示数据条数发生变化的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    addSpu() {
      this.scene = 1;
    },
    updateSpu(row) {
      this.scene = 1;
      //获取子组件SpuForm的方法
      this.$refs.spu.initSpuData(row);
    },
    //自定义事件回调(SpuForm)
    changeScene(scene) {
      this.scene = scene;
    },
  },
};
</script>

<style>
</style>