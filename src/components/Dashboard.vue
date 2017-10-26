<template>
  <div class="stage">

  </div>
</template>
<style scoped>
	.stage{
		width: 100%;
		height: 100%;
		outline: 1px dashed #CCC;
	}
</style>
<script>
export default {
  data() {
    return {

    }
  },
  mounted(){
	  let stage = new createjs.Stage('stage');
	  let shape = new createjs.Shape();
	  shape.graphics.beginFill('red').drawRect(0,0,120,120);
	  stage.addChild(shape);
	  stage.update();
  }
}
</script>