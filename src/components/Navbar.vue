<template>
	<!-- Navbar -->
	<div class="navbar navbar-default" id="navbar">
		<a class="navbar-brand" href="#">
			<i class="icon-bug"></i> 公安WEB问题汇总平台 | BUG PLATFORM
		</a>
		<ul class="nav navbar-nav pull-right">
			<li class="dropdown">
				<a class="dropdown-toggle" v-on:click="showsubFn" href="#">
					<i class="icon-envelope"></i> 信息
					<span class="badge">5</span>
					<b class="caret"></b>
				</a>
				<ul class="dropdown-menu" style="display:block;" v-if="showsub">
					<li>
						<a href="#">New message</a>
					</li>
					<li>
						<a href="#">Inbox</a>
					</li>
					<li>
						<a href="#">Out box</a>
					</li>
					<li>
						<a href="#">Trash</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="#">
					<i class="icon-cog"></i> 设置
				</a>
			</li>
			<li>
				<a href="#">
					<i class="icon-coffee"></i>
					<strong>{{setDepName}}</strong>
				</a>
			</li>
			<li class="dropdown user">
				<a class="dropdown-toggle" v-on:click="showuserFn" data-toggle="dropdown" href="#">
					<i class="icon-user"></i>
					<strong>{{setUserName}}</strong>
					<img class="img-rounded" src="">
					<b class="caret"></b>
				</a>
				<ul class="dropdown-menu" style="display:block;" v-if="showuser">
					<li>
						<a href="#">Edit Profile</a>
					</li>
					<li class="divider"></li>
					<li>
						<a @click="signOut" href="#">Sign out</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'Navbar',
	data() {
		return {
			showsub: false,
			showuser: false
		}
	},
	created(){
		
	},
	computed:{
		setDepName(){
			return this.$store.state.user.FDeptName.split('-').pop();
		},
		setUserName(){
			return this.$store.state.user.FUserName;
		}
	},
	methods:{
		showsubFn(){
			if(this.showsub){
				this.showsub = false;
			}else{
				this.showsub = true;
			}
		},
		showuserFn(){
			if(this.showuser){
				this.showuser = false;
			}else{
				this.showuser = true;
			}
		},
		signOut(){
			this.$store.dispatch('disableLogin');
			this.$store.dispatch('logOut');
			this.$router.replace('/login');
		}
	}
}
</script>
