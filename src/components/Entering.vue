<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<i class="icon-edit icon-large"></i> BUG 提交
		</div>
		<div class="panel-body">
			<form @submit.prevent="submit">
				<fieldset>
					<legend>问题详情</legend>
					<div class="form-group row">
						<div class="col-lg-3">
							<label class="control-label">产生模块</label>
							<input class="form-control" placeholder="请输入模块名称" v-model="form.module" type="text">
						</div>
						<div class="col-lg-3">
							<label class="control-label">问题类型</label>
							<select class="form-control" v-model="form.type">
								<option>web前端</option>
								<option>电子地图</option>
								<option>数据库</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label">问题名称</label>
						<input class="form-control" v-model="form.name" placeholder="请输入问题名称" type="text">
					</div>
					<div class="form-group">
						<label class="control-label">问题描述</label>
						<input class="form-control" v-model="form.describe" placeholder="请输入问题描述">
						<p class="help-block">Example block-level help text here.</p>
					</div>
					<div class="form-group">
						<label class="control-label">问题分析</label>
						<textarea class="form-control" v-model="form.analysis" rows="4"></textarea>
					</div>
					<div class="form-group">
						<label class="control-label">解决方案</label>
						<textarea class="form-control" v-model="form.solve" rows="4"></textarea>
					</div>
					<div class="form-group">
						<label class="control-label">记录时间</label>
						<input class="form-control" disabled v-model="time" placeholder="This is field is disabled!">
					</div>
				</fieldset>
				<!-- <fieldset>
					<div class="form-group">
						<label class="control-label">重大问题</label>
						<div class="radio">
							<input checked name="options_radio" type="radio" value="true"> 是
							<br>
							<input checked name="options_radio" type="radio" value="false"> 否
						</div>
					</div>
				</fieldset> -->
				<div class="form-actions">
					<button class="btn btn-danger" type="submit">提交</button>
					<a class="btn btn-default" v-on:click="$router.push('home')">取消</a>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import store from '@/store/store'
export default {
	data() {
		return {
			form: {
				authorId:"",
				authorName:"",
				department:"",
				analysis:"",
				describe:"",
				module:"",
				tel:"",
				name:"",
				solve:"",
				type:""
			},
			time: ""
		}
	},
	created() {
		let user = store.state.user;
		this.form.authorId = user.FUserCode; // id
		this.form.authorName = user.FUserName; // 姓名
		this.form.tel = user.FShortTel; // 联系方式
		this.form.department = user.FDeptName.split('-').pop(); // 三级部门名称
		//this.form.location = user.FLocation; // 地址
		//this.form.departmentNumber = user.FDeptNumber; // 部门代码
		this.time = this.dateFormatter(new Date());
	},
	methods: {
		// 格式化日期
		dateFormatter: function(date){
			return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+
			date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		},
		// 提交
		submit: function() {
			var that = this;
			this.form.time = this.time;
			axios.post('/api/entering',this.form)
			.then(function(response){
				alert("提交成功");
				that.$router.push('home');
			})
			.catch(function(error){
				console.log(error)
			});
			
			return false;
		}
	}
}
</script>