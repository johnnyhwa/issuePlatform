<template>
    <div id="detail">
        <div class="row">
            <div class="col-md-9">
                Add your custom filters here...
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <input class="form-control" placeholder="查询..." type="text">
                    <span class="input-group-btn">
                        <button class="btn" type="button">
                            <i class="icon-search"></i>
                        </button>
                    </span>
                </div>
            </div>
        </div><br/>
        <bug-item v-for="item in itemList" v-bind:showdetail="showDetail" v-bind:item="item" v-bind:key="item._id"></bug-item>
    </div>
</template>
<script>
import axios from 'axios'
var item = {
    props:['item','showdetail'],
    template: '<div class="panel panel-default list-detail" v-on:click="showdetail(item)">\
                    <div class="panel-heading">\
                    <div class="col-lg-1">\
                        <i class="panel-head-icon icon-user"></i>\
                        <span class="panel-head-text panel-head-id">{{item.authorId}}</span>\
                    </div>\
                    <div class="col-lg-1">\
                        <i class="panel-head-icon icon-phone"></i>\
                        <span class="panel-head-text panel-head-id">{{item.tel}}</span>\
                    </div>\
                    <div class="col-lg-2">\
                        <i class="panel-head-icon icon-coffee"></i>\
                        <span class="panel-head-text panel-head-time" v-bind:title="item.department">{{item.department}}</span>\
                    </div>\
                    <div class="col-lg-3">\
                        <i class="panel-head-icon icon-bug"></i>\
                        <span class="panel-head-text panel-head-name" v-bind:title="item.name">{{item.name}}</span>\
                    </div>\
                    <div class="col-lg-2 pull-right">\
                        <i class="panel-head-icon icon-time"></i>\
                        <span class="panel-head-text panel-head-time">{{item.time}}</span>\
                    </div>\
                    <div class="col-lg-2 pull-right">\
                        <i class="panel-head-icon icon-tag"></i>\
                        <router-link to="/catlog/detail" class="panel-head-text panel-head-tag" href="">{{item.type}}</router-link>\
                    </div>\
                    </div>\
                    <div class="panel-body">\
                        <p v-bind:title="item.describe">{{item.describe}}</p>\
                    </div>\
                </div>'
};
export default {
    data() {
        return {
            itemList:[], // 列表数据
            pageNum:0, // 当前分页数
            pageSize:10 // 请求页面大小
        }
    },
    components:{
        "bug-item": item
    },
    created() {
        var that = this;
        this.queryItem(this.pageNum,this.pageSize); 
    }, 
    mounted(){
        document.getElementById("content").addEventListener('scroll',this.scrollHandle)
    },
    destroyed(){
        document.getElementById("content").removeEventListener('scroll',this.scrollHandle);
    },  
    methods:{
        /**
         * @method showDetail
         * @description 显示详细信息
         * @param {Object} item 列表对象 
         */
        showDetail(item){
            this.$router.push({name:"detail",params:{item}})
        },

        /**
         * 滚动条方法
         * 
         */
        scrollHandle(){ 
            let length = this.itemList.length;
            let top = document.getElementById("content").scrollTop;
            let sheight = document.getElementById("content").scrollHeight;
            let cheight = document.getElementById("content").clientHeight;
            if(sheight-cheight-top<50){
                this.queryItem(this.pageNum,this.pageSize);
            }
        },

        /**
         * 列表请求方法
         * 
         * @param {Number} pageNum 当前页数
         * @param {Number} pageSize 请求页数
         */
        queryItem(pageNum, pageSize){
            let that = this;
            axios.post('/api/findAll',{
                pageSize, pageNum
            })
            .then((response) => {
                this.pageNum += response.data.dataList.length;
                that.itemList.push(...response.data.dataList);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>