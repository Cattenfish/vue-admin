<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable">
      </CategorySelect></el-card
    ><el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格 展示平台属性-->
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                sizi="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                sizi="mini"
                @click="deleteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性、修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          :data="attrInfo.attrValueList"
          style="width: 100%"
          margin="20px 0px"
          border
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="" align="center" label="属性值名称">
            <template slot-scope="{ row, $index }">
              <!-- 这里结构需要用到span与input来回切换 -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              ></template
            ></el-table-column
          >
          <el-table-column prop="" align="center" label="操作"
            ><template slot-scope="{ row, $index }">
              <!-- 气泡确认框 -->
              <el-popconfirm
                :title="`确定删除${row.valueName}吗?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  sizi="mini"
                  slot="reference"
                ></el-button> </el-popconfirm></template
          ></el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import CategorySelect from "@/components/CategorySelect/index.vue";
//按需引入loadsh当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //接受平台属性的字段
      attrList: [],
      //控制table表单隐藏与否
      isShowTable: true,
      //收集新增属性或修改属性使用
      attrInfo: {
        attrName: "",
        //属性名
        attrValueList: [], //属性值，因为属性值可以有多个 因此用数组每一个属性值都是对象，需要attrId,valueName
        categoryId: this.category3Id, //三级分类的id
        categoryLevel: 0, //因为服务器也需要区分几级id
      },
    };
  },
  components: { CategorySelect },
  methods: {
    //自定义事件的回调
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
        //发请求获取属性
        this.getAttrList();
      }
    },
    //获取平台属性数据
    //当用户确定三级分类数据的时候，可以向服务器发送请求获取平台属性展示
    async getAttrList() {
      //获取分类的id
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    //添加属性值的回调
    addAttrValue() {
      //向属性值的数组里面添加元素
      //attrId是你相应的属性的id，目前而言我们是添加属性的操作，还没有相应的属性id，带给服务器的id为undefined
      //valueName：相应的属性值的名称
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        //对于修改某一个属性的时候，可以在已有属性值基础上新增新的属性值
        //新增属性值的时候需要把已有的id带上
        valueName: "",
        flag: "true",
        //flag给每一个属性值添加标记用于切换查看和编辑模式，每一个属性值可以控制自己的切换
        //当前flag为响应式数据，数据变化跟着视图变化
      });
      this.$nextTick(() => {
        this.refs[this.attrrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性按钮的回调
    addAttr() {
      //切换table的显示与隐藏
      this.isShowTable = false;
      //清除数据
      this.attrInfo = {
        attrName: "",
        //属性名
        attrValueList: [],
        categoryId: this.category3Id, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分几级id
      };
    },
    updateAttr(row) {
      this.isShowTable = false;
      //由于数据结构当中存在对象里面套数组，数组里面套对象，因此需要使用深拷贝解决这类问题
      this.attrInfo = cloneDeep(row);

      this.attrInfo.attrValueList.forEach((item) => {
        //这样书写可以给属性值添加flag自动，但是会发现视图不会跟着变化（因为flag不是响应式数据）
        //因为vue无法探测普通的新增property,这样书写的属性并非响应式属性
        //第一个参数：对象 第二个参数：添加新的响应式属性 第三参数：新的属性变化值
        this.$set(item, "flag", false);
      });
    },
    deleteAttr(row) {
      this.$confirm(`你确定删除${row.attrName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //当用户点击确定按钮的时候回触发
          //向服务器发请求
          let result = await this.$API.attr.reqDeleteAttr(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //再次获取品牌列表的数据
            this.getAttrList();
          }
        })
        .catch(() => {
          //当用户点击取消按钮的时候回触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //失去焦点事件---切换为查看模式，展示span
    toLook(row) {
      //如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      if (row.valueName.trim() == "") {
        this.$$message("请你输入一个正常的属性值");
        return;
      }
      //新增属性值不能与已有的属性值重复
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        //需要将row从数组里面判断的时候取出
        //row最新新增的属性值{数组最后一项元素}
        //判断的时候，需要把已有的数组当中新增的这个属性值去除
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepeat) return;
      //row：形参是当前用户添加的最新的属性值
      //当前编辑模式变为查看模式【让input消失，显示span】
      row.flag = false;
    },
    toEdit(row, index) {
      row.flag = true;
      //获取input结点 实现自动聚焦
      //需要注意 点击span时候，切换为input变为编辑模式 但是需要注意 对于浏览器而言 页面重绘与重拍耗时间的
      //点击span时候，重绘重拍一个input需要耗费时间，因此不能一点span离开获取input
      //$nextTick,当节点渲染完毕，会执行一次
      this.$nextTick(() => {
        //获取相应的input表单元素
        this.$refs[index].focus();
      });
    },
    //气泡确认框的确定按钮的回调
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    //保存按钮，进行添加属性或修改属性的操作
    async addOrUpdateAttr() {
      //属性为空不应该提交 不需要flag
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          //过滤属性不是空的
          if (item.valueName !== "") {
            //删除flag
            delete item.flag;
            return true;
          }
        }
      );
      try {
        //发请求
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        this.isShowTable = true;
        this.$message({ type: "success", message: "保存成功" });
        this.getAttrList();
      } catch (error) {
        this.$message({ type: "error", message: "保存失败" });
      }
    },
  },
};
</script>

<style>
</style>