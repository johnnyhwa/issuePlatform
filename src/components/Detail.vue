<template>
  <div id="detail">
      {{item}}
  </div>
</template>
<script>
export default{
    props:['item'],
    data(){
        return {
            
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next()
    }
}
</script>
