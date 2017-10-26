<template>
    <!-- Sidebar -->
    <section id="sidebar">
        <i class="icon-align-justify icon-large" id="toggle"></i>
        <ul id="dock">
            <li class="launcher" v-for="(bar,index) in siderbar" v-bind:key="bar.id" v-bind:class="{active:bar.to===$route.matched[1].path}">
                <i v-bind:class="bar.ico"></i>
                <router-link v-bind:to="bar.to">{{bar.name}}</router-link>
            </li>
        </ul>
        <div data-toggle="tooltip" id="beaker" title="Made by FEOP"></div>
    </section>
</template>

<script>

const siderbar = [
    {ico:"icon-home",to:"/home/index",name:"主页"},
    {ico:"icon-file-text-alt",to:"/home/entering",name:"录入"},
    {ico:"icon-folder-open",to:"/home/catalog",name:"目录"},
    {ico:"icon-table",to:"/home/table",name:"列表"},
    {ico:"icon-book",to:"/home/logs",name:"日志"},
    {ico:"icon-tags",to:"/home/tags",name:"标签"},
    {ico:"icon-cloud-download",to:"/home/export",name:"导出"},
    {ico:"icon-dashboard",to:"/home/dashboard",name:"仪表盘"},
    {ico:"icon-cog",to:"/home/config",name:"设置"},
    {ico:"icon-lightbulb",to:"/home/about",name:"关于"}
];

export default {

    data() {
        return {
            siderbar: siderbar
        }
    },
    created(){
         
    },
    methods:{

    }
}    
</script>