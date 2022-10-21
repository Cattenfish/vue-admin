<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 三级联动全局组件 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="scene != 0">
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
                title="添加sku"
                @click="addSku(row)"
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
                @click="handler(row)"
              ></HintButton>
              <el-popconfirm
                :title="`确定删除${row.spuName}吗？`"
                @onConfirm="deleteSpu(row)"
              >
                <HintButton
                  type="danger"
                  icon="el-icon-delete"
                  sizi="mini"
                  title="删除spu"
                  slot="reference"
                ></HintButton>
              </el-popconfirm> </template
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
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScene1="changeScene1"
      ></SkuForm>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的SKU列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template> </el-table-column
      ></el-table>
    </el-dialog>
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
      page: 1, //当前第几页
      limit: 3, //每页展示条数
      records: [], //spu列表的数据
      total: 0, //分页器一个需要展示的数据条数
      scene: 0,
      dialogTableVisible: false, //控制对话框的显示隐藏
      spu: {},
      skuList: [], //sku列表的数组
      loading: true, //loading效果表格
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
      //通知子组件SpuForm发请求--两个
      this.$refs.spu.addSpuData(this.category3Id);
    },
    updateSpu(row) {
      this.scene = 1;
      //获取子组件SpuForm的方法
      this.$refs.spu.initSpuData(row);
    },
    //自定义事件回调(SpuForm)
    changeScene({ scene, flag }) {
      //flag这个按钮是为了区分保存按钮是添加还是修改
      this.scene = scene;
      //子组件通知父组件切换场景，需要再次获取spu列表的数据进行展示
      if (flag == "修改") {
        //停留在当前页
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    //删除spu按钮的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      //2022.10.17删除不成功，怀疑后端接口问题
      //后端狗出来挨打！！！！！！！！！！！！！！！
      //后端狗出来挨打！！！！！！！！！！！！！！！
      //后端狗出来挨打！！！！！！！！！！！！！！！
      //后端狗出来挨打！！！！！！！！！！！！！！！
      //后端狗出来挨打！！！！！！！！！！！！！！！
      //2022.10.18好吧我写错了，后端大哥对不起
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加sku按钮的回调
    addSku(row) {
      //切换场景为2
      this.scene = 2;
      //父组件调用子组件的方法，让子组件发请求---三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    //skuform 通知父组件修改场景
    changeScene1(scene) {
      this.scene = scene;
    },
    //查看sku按钮的回调
    async handler(spu) {
      //点击按钮的时候，对话框可见
      this.dialogTableVisible = true;
      //保存spu信息
      this.spu = spu;
      ///获取sku列表的数据进行展示
      let result = await this.$API.spu.reqSkuList(spu.id);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false;
      }
    },

    //关闭对话框的回调
    close(done) {
      //loading属性再次变为真
      this.loading = true;
      //清除sku列表的数据
      this.skuList = [];
      //管理对话框
      done();
    },
  },
};
</script>

<style>
</style>