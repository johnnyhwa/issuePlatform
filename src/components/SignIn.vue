<template>
	<div class="login wrapper">
		<img src="../assets/images/bg3.jpg" class="bg-img"></img>
		<div id="particle"></div>
		<div class="row">
			<div class="col-lg-12">
				<div class="brand text-center">
					<h1>
						<div class="logo-icon">
							<i class="icon-bug"></i>
						</div>用户登录
					</h1>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<form @keyup.13="toSubmit">
					<fieldset class="text-center">
						<legend>公安WEB问题汇总平台</legend>
						<div class="form-group">
							<input class="form-control" v-model="form.userId" placeholder="工号" type="text">
						</div>
						<div class="form-group">
							<input class="form-control" v-model="form.pwd" placeholder="密码" type="password">
						</div>
						<div class="text-center">
							<div class="checkbox">
								<label>
									<input type="checkbox"> 记住密码
								</label>
							</div>
							<a class="btn btn-default" @click="toSubmit" href="#">登录</a>
							<br>
							<a href="#">问题反馈</a>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import '../assets/js/particles.min'

export default {
	name: 'signin',
	data() {
		return {
			form: {
				userId: '',
				pwd: '',
				hasLogin: false
			},
			issubmit: false
		}
	},
	created() {

	},
	mounted() {
		this.drawParticles();
	},
	computed: {
	},
	methods: {
		...mapActions(['disableLogin', 'logIn', 'loginSuccess']),
		drawParticles() {
			particlesJS("particle", {
				"particles": {
					"number": {
						"value": 88,
						"density": {
							"enable": true,
							"value_area": 700
						}
					},
					"color": {
						"value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
					},
					"shape": {
						"type": "circle",
						"stroke": {
							"width": 0,
							"color": "#000000"
						},
						"polygon": {
							"nb_sides": 15
						}
					},
					"opacity": {
						"value": 0.5,
						"random": false,
						"anim": {
							"enable": false,
							"speed": 1.5,
							"opacity_min": 0.15,
							"sync": false
						}
					},
					"size": {
						"value": 2,
						"random": false,
						"anim": {
							"enable": true,
							"speed": 3,
							"size_min": 0.15,
							"sync": false
						}
					},
					"line_linked": {
						"enable": true,
						"distance": 110,
						"color": "#FFFFFF",
						"opacity": 0.25,
						"width": 1
					},
					"move": {
						"enable": true,
						"speed": 1.6,
						"direction": "none",
						"random": false,
						"straight": false,
						"out_mode": "out",
						"bounce": false,
						"attract": {
							"enable": false,
							"rotateX": 600,
							"rotateY": 1200
						}
					}
				},
				"interactivity": {
					"detect_on": "canvas",
					"events": {
						"onhover": {
							"enable": false,
							"mode": "repulse"
						},
						"onclick": {
							"enable": false,
							"mode": "push"
						},
						"resize": true
					},
					"modes": {
						"grab": {
							"distance": 400,
							"line_linked": {
								"opacity": 1
							}
						},
						"bubble": {
							"distance": 400,
							"size": 40,
							"duration": 2,
							"opacity": 8,
							"speed": 3
						},
						"repulse": {
							"distance": 200,
							"duration": 0.4
						},
						"push": {
							"particles_nb": 4
						},
						"remove": {
							"particles_nb": 2
						}
					}
				},
				"retina_detect": true
			});
		},
		toQuit() {
			this.disableLogin();
		},
		toSubmit() {
			this.issubmit = true;
			if (!this.form.userId) {
				alert("账号不能为空!");
				return;
			} else if (!this.form.pwd) {
				alert("密码不能为空!");
				return;
			}
			axios.post('/api/users/login', this.form)
				.then((response) => {
					if (response.data.success) {
						this.form.hasLogin = true;
						this.disableLogin();
						this.logIn(JSON.parse(response.data.userResult));
						this.loginSuccess();
						this.$router.replace({ path: '/home' });
					} else {
						alert(response.data.msg);
					}

				})
				.catch((error) => {
					alert("服务器异常，请稍后重试!")
				})
		}
	}
}
</script>
<style scoped>
#particle {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
	background-color: rgba(50, 56, 64, 0.55);
	background-image: url("");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
}
</style>

