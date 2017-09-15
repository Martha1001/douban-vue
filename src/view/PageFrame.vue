<template>
	<div>
		<header-bar @Open="openit"></header-bar>
		<router-view class="m-bd"></router-view>
		<dialog-view v-show="DialogStatus" @Close="closeit"></dialog-view>
	</div>
</template>

<script>
	import HeaderBar from '../components/HeaderBar.vue'
	import DialogView from '../view/DialogView.vue'

	export default {
		name: 'page',
		data(){
			return{
				DialogStatus:''
			}
		},
		components:{
			HeaderBar,
			DialogView
		},
		methods:{
			openit(){
				this.DialogStatus = true
			},
			closeit(){
				this.DialogStatus = false
			}
		}
	}
</script>

<style scoped>
.m-bd{
	padding-top: 47px;
}
</style>