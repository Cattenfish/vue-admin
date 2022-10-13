<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px, 0px"
      @click="addTradeMark()"
      >添加</el-button
    >
    <!-- data为表格组件需要展示的数据，且为数组类型 -->
    <!-- stripe斑马纹 border边框 align 对齐方式-->
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column prop="logoUrl" label="品牌logo">
        <!-- 图片使用作用域插槽 -->
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      @size-change="handleSizeChange"
      @current-change="getPageList"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="pager, next, jumper,->,total,sizes"
      :total="total"
    >
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- form表单 :model属性，这个属性的作用是，把表单的数据收集到哪个对象上，将来表单验证，也需要这个属性-->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <!-- 这里收集数据，不能使用v-model，因为不是表单元素
          action:设置图片上传的地址
          :on-success:可以检测到图片上传成功，当图片上传成功，会执行一次
          :before-upload:可以在上传图片之前，会执行一次
          -->
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "tradeMark",
  //组件挂载完毕发请求
  data() {
    return {
      currentPage: 1,
      //  代表分页器第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      //列表展示数据
      list: [],
      //对话框显示与隐藏控制
      dialogFormVisible: false,
      //收集品牌信息:对象身上的属性，不能瞎写，需要看文档
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      //表单验证规则
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请选择品牌的图片" }],
      },
    };
  },
  mounted() {
    //获取列表数据的方法
    this.getPageList();
  },
  methods: {
    //获取品牌列表的数据
    async getPageList(pager = 1) {
      //改变页码
      this.page = pager;
      //结构出参数
      const { page, limit } = this;
      //获取品牌列表的接口
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    //改变分页器每页展示的条数
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    //添加某个品牌
    addTradeMark() {
      //显示对话框
      this.dialogFormVisible = true;
      //清除数据
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    },
    //修改某个品牌
    updateTradeMark(row) {
      //当前用户选中的品牌信息
      this.dialogFormVisible = true;
      //将已有的品牌信息赋值给tmForm进行展示
      //也就是tmForm存储的即为服务器返回信息
      this.tmForm = { ...row };
    },
    //删除某个品牌
    deleteTradeMark(row) {
      console.log(row);
      this.$confirm(`你确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //当用户点击确定按钮的时候回触发
          //向服务器发请求
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //再次获取品牌列表的数据
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
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
    //图片上传成功
    handleAvatarSuccess(res, file) {
      //res上传成功以后返回前端的数据
      //file 上传成功以后服务器返回前端的数据
      //收集品牌图片数据，因为将来需要带给服务器
      this.imageUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data;
    },
    //图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //添加按钮（添加品牌|修改品牌）
    addOrUpdateTradeMark() {
      //当全部验证字段通过以后，再去书写业务逻辑
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          //发请求（添加品牌|修改品牌）
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (result.code == 200) {
            this.getPageList;
            //弹出信息:添加品牌成功、修改品牌成功
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            //添加或修改品牌以后，需要再次获取品牌列表进行展示
            //如果添加品牌，停留在第一页，修改品牌应该留在当前页面
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
  
  <style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
