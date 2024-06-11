<template>
	<div>
		<Post :instaData="instaData[i]"
    v-for="(a, i) in instaData" :key="i"/>
	</div>
</template>
<script>
import Post from './Post.vue'

export default {
	name: "Container",
  props: {
    instaData: Array,
  },
  components: {
    Post,
  }
};
</script>
