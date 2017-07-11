<template>
<div id="searchItem">
<el-row style="width:100%">
	<el-col :span="5"></el-col>
	<el-col :span="14">
	<el-input place-holder="输入商品信息" class="input" v-model="inputMsg"></el-input>
	<el-button-group class="btn">
	<el-button type="primary" @click="search">搜索</el-button>
	<el-button @click="empty">清空</el-button>
	</el-button-group>
		<el-table
		:data="searchResults"
		style="width:100%"
		@select="selectItem"
		@select-all="selectAll"
		>
			<el-table-column
			type="selection"></el-table-column>
			<el-table-column
			prop="item"
			label="物品信息"></el-table-column>
			<el-table-column
			prop="price"
			label="价格"></el-table-column>
			<el-table-column
			label="操作">
				<template scope="scope">
            <el-input-number  :min="1" :max="99" size="small" v-model="scope.row.num" @change="handleChange(scope.$index,scope.row)"></el-input-number>
              <el-button @click="deleteItem(scope.$index,scope.row)" type="text" size="small">删除</el-button>
            </template>
			</el-table-column>
		</el-table>
		<h5>合计{{itemNum}}件</h5>
		<el-button type = "success" class = "btn" @click = "addToCart">添加进购物车</el-button>
	</el-col>
	<el-col :span="5"></el-col>
</el-row>
</div>
</template>

<script>
/*eslint-disable*/
import {mapActions} from 'vuex'
export default{
	data:function(){
		return {
			searchResults:[{
				item:String,
				price:Number,
				afterPrice:Number,
				isClick:Number,
				num:Number
			}],
			num:0,
			itemHolder:[{
				item:'鞋子',
				price:12.2,
				afterPrice:12.2,
				isClick:0,
				num:1
			},
			{
				item:'益力多',
				price:14.9,
				afterPrice:14.9,
				isClick:0,
				num:1
			},
			{
				item:'iphone7',
				price:12,
				afterPrice:12,
				isClick:0,
				num:1
			},
			{
				item:'裙子',
				price:550,
				afterPrice:550,
				isClick:0,
				num:1
			},
			{
				item:'YSL',
				price:256,
				afterPrice:256,
				isClick:0,
				num:1
			},
			{
				item:'，帽子',
				price:15,
				afterPrice:15,
				isClick:0,
				num:1
			},
			{
				item:'水杯',
				price:78,
				afterPrice:78,
				isClick:0,
				num:1
			},
			],
			inputMsg:'',
			selectedItem:[],
			itemNum:0,
			isAll:0
		}
	},
	watch:{
		selectedItem:function(){
			if (this.selectedItem.length == 0)
			{
				this.itemNum = 0
			}
			this.itemNum = this.selectedItem.length
		}
	},
	methods:{
			handleChange:function(index,row){
				this.searchResults[index].afterPrice += this.searchResults[index].price
			},
			search:function(){
				var inputMsg=this.inputMsg
				this.itemHolder.forEach(element => {
					if(element.item == this.inputMsg)
					{
						this.searchResults.push(element)
						this.$message({
							type:'success',
							message:'成功'
						})
						this.inputMsg=''
					}else{
						this.$message({
							type:'info',
							message:'无搜索物品'
						})
					}
				})
			},
			empty:function(){
				this.searchResults=[]
				this.inputMsg=''
				this.itemNum = 0
			},
			selectItem:function (selection,row){
				row.isClick = !row.isClick
				if(row != null&&row.isClick == 1)
				{
					this.selectedItem.push(row)
					this.itemNum = this.selectedItem.length 
				}
				if(row.isClick == 0)
				{
					this.selectedItem.splice(this.selectedItem.indexOf(row),1)
					this.itemNum = this.selectedItem.lengthip
				}
			},
			selectAll:function (selection) {
				this.selectedItem = selection
				this.itemNum = this.selectedItem.length
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
			addToCart:function () {
				if(this.selectedItem.length >0)
				{
					var items = this.selectedItem
					items.forEach(element =>{
						element.isClick = 0
					})
				  	this.getItem(items)
					this.$router.push({
					name:'indexPage'
				})
				}else{
					this.$message({
						type:'info',
						message:'选择物品'
					})
				}
			},
			...mapActions([
				'getItem'])
		},
		mounted:function(){
			this.searchResults = []
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#searchItem{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.el-row{
  height: 700px;
}
.el-col{
  height: 700px;
}
.el-table{
	margin-top: 60px;
}
.input{
	width: 300px;
	position: absolute;
	left:21%;
	top:0;
}

.btn{
	position: absolute;
	right: 21%
}
h5{
	text-align: left;
	position: absolute;
}
</style>
