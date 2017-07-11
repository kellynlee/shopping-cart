<template>
<div id = "indexPage">
<h1 class="title">购物车</h1>
<el-button type="primary" class="button" @click="linkToSearch">搜索物品</el-button>
    <el-row :gutter="10">
      <el-col :span="4"></el-col>
      <el-col :span="16">
        <el-table
        :data="shoppingInfo"
        style="width:100%"
        @select-all="selectAll"
        @select="selectItem"
        >
        <el-table-column 
          type="selection"
          ></el-table-column>
          <el-table-column 
          prop="item"
          label="物品信息"
          ></el-table-column>
          <el-table-column 
          prop="price"
          label="价格"
          ></el-table-column>
          <el-table-column 
          label="操作"
          >
            <template scope="scope">
            <el-input-number  :min="1" :max="99" size="small" v-model="scope.row.num" @change="handleChange(scope.$index,scope.row)"></el-input-number>
              <el-button @click="deleteItem(scope.$index,scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <h4>{{sum}}</h4>
        <el-button type="text" size="small" class="deleteBtn" @click="deleteAll">批量删除</el-button>
        <el-button type="success" class="payBtn">结算</el-button>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    </div>
</template>

<script>
/* eslint-disable */
import {mapGetters} from 'vuex'
  export default{
    data:function (){
      return {
        shoppingInfo:[{
          item:String,
          price:Number,
          num:Number,
          isClick:Number                //未选中状态为0
        }],
        num1:1,
        tempArr:[],
        isAll:0,                      //是否全选
        sum:0  
      }
    },
    computed:{
        ...mapGetters(['itemToAdd'])
    },
    watch:{
      tempArr:function(){
         if(this.tempArr.length == 0)
      {
        this.sum = 0
      }
      }
    },
    methods:{
      initInfo:function (){
        this.shoppingInfo = [{
          item:'眼镜',
          afterPrice:18,
          price:18,
          num:1,
          isClick:0                //未选中状态为0
        },{
          item:'碗',
          afterPrice:12,
          price:12,
          num:1,
          isClick:0
        },{
          item:'裤子',
          afterPrice:11,
          price:11,
           num:1,
           isClick:0
        },{
          item:'帽子',
          afterPrice:15.5,
          price:15.5,
          num:1,
          isClick:0
        },{
          item:'金项链',
          afterPrice:188,
          price:188,
          num:1,
          isClick:0
        }]
        if(this.itemToAdd.length !=0)
        {
          this.itemToAdd.forEach(element =>{
            this.shoppingInfo.push(element)
          })
        }
      },
      deleteItem:function(index,row){
        this.$confirm('确定删除？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() => {
          this.shoppingInfo.splice(this.shoppingInfo.indexOf(row),1)
          this.$message({
            type:'success',
            message:'删除成功！'
          })
          this.sum = this.sum-row.price
        }).catch(() => {
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
      },
      handleChange:function(index,row){
        this.shoppingInfo[index].afterPrice +=this.shoppingInfo[index].price
        if(row.isClick == 1)
        {
          this.sum = this.shoppingInfo[index].price+this.sum
          console.log(this.shoppingInfo[index].afterPrice)
        }
       
      },
      getSum:function(sum,row){
        sum = sum+row.afterPrice
        return sum
      },
      selectItem:function (selection,row){
        row.isClick = !row.isClick
        if(row.isClick == 0)
        {
          this.tempArr.splice(this.tempArr.indexOf(row),1)
          this.sum -=row.price
        }
      if(row != null&&row.isClick==1)
      {
      this.tempArr.push(row)
      this.sum = this.getSum(this.sum,row)
      } 
      },
      selectAll:function(selection){
        this.isAll = !this.isAll
        this.tempArr= selection
        this.tempArr.forEach(element=>{
          console.log(this.sum+=element.price)
        })
      },
      deleteAll:function(){
        this.$confirm('确定批量删除？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() => {
          this.shoppingInfo.splice(0,this.shoppingInfo.length)
          this.$message({
            type:'success',
            message:'删除成功！'
          });
        }).catch(() => {
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
      },
      linkToSearch:function(){
        this.visibility=true
        if(this.visibility=true){
          this.$router.push({
            name:'searchItem'
          })
        }
      }
    },
    mounted:function(){
      this.initInfo(1)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  position: absolute;
  z-index: 100;
  height: 50px;
  width: 100%;
  top: 0;
  margin-top: 15px;
}
h1{
  text-align: center;
}
h4{
  text-align: right;
}
.el-row{
  height: 700px;
}
.el-col{
  height: 700px;
}
.deleteBtn{
  float: left;
}
.payBtn{
  float: right;
}
.button{
  display: inline;
  position: absolute;
  top: 0;
  z-index:1000;
  margin-top: 21px;
  right: 18%;
}
</style>
