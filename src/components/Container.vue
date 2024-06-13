<template>
	<div>
		<!-- 게시글페이지 -->
		<div v-if="step == 0">
			<Post :instaData="$store.state.instaData[i]" :i="i"
      v-for="(a, i) in $store.state.instaData" :key="i">
        <!-- <template v-slot:name>{{ instaData[i].name }}</template> -->
        <!-- <template v-slot:likes>{{ instaData[i].likes }}</template> -->
      </Post>
		</div>

		<!-- 필터선택페이지 -->
		<div v-if="step == 1">
			<!-- <div class="upload-image" :style="{ backgroundImage: `url(${img})` }"></div> -->
			<div :class="`upload-image ${selectedFilter}`" :style="`background-image: url(${img})`"></div>
			<div class="filters">
        <FilterBox :img="img" :filter="filter" v-for="(filter, i) in filters" :key="i">
          <span>{{ filter }}</span>
        </FilterBox>
			</div>
		</div>

		<!-- 글작성페이지 -->
		<div v-if="step == 2">
			<div :class="`upload-image ${selectedFilter}`" :style="`background-image: url(${img})`"></div>
			<div class="write">
				<textarea @input="$emit('newContent', $event.target.value)"
        class="write-box" placeholder="write here"></textarea>
			</div>
		</div>

		<!-- 마이페이지 -->
		<div v-if="step == 3">
			<MyPage/>
		</div>

	</div>
</template>
<script>
import Post from "./Post.vue";
import MyPage from "./MyPage.vue";
import FilterBox from "./FilterBox.vue";

export default {
	name: "Container",
  data() {
    return {
      filters: [
        "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson",
        "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua",
        "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"
      ],
      // i: 0,
    }
  },
	props: {
		instaData: Array,
    // 해당 컴포넌트에서 써도 되지만, App.vue 에서도 탭을 사용할 가능성이 큼
    // 그러므로 props 로 받아와서 쓰자
    step: Number,
    img: String,
    newContent: String,
    selectedFilter: String,
	},
	components: {
		Post,
    FilterBox,
		MyPage,
	},
};
</script>
<style>
.upload-image {
	width: 100%;
	height: 450px;
	background: cornflowerblue;
	background-size: cover;
}
.filters {
	overflow-x: scroll;
	white-space: nowrap;
}
.filter-1 {
	width: 100px;
	height: 100px;
	background-color: cornflowerblue;
	margin: 10px 10px 10px auto;
	padding: 8px;
	display: inline-block;
	color: white;
	background-size: cover;
}
.filters::-webkit-scrollbar {
	height: 5px;
}
.filters::-webkit-scrollbar-track {
	background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
	background: #888;
	border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
	background: #555;
}
.write-box {
	border: none;
	width: 90%;
	height: 100px;
	padding: 15px;
	margin: auto;
	display: block;
	outline: none;
}
</style>
