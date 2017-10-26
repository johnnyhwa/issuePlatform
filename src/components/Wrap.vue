<template>
    <div id="container">
        <Navbar />
        <div id="wrapper">
        <Siderbar/>
        <Tools/>
        <div id="content">
            <transition name="slide-in" mode="out-in">
                <router-view/>
            </transition>
        </div>
        </div>
        
    </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Siderbar from './Siderbar.vue'
import Tools from './Tools.vue'

export default {
    name: 'Wrap',
    data() {
        return {

        }
    },
    components: {
        Siderbar,
        Navbar,
        Tools
    }
}    
</script>

