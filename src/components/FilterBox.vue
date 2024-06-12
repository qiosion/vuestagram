<template>
  <!--
      : 를 이용해서 데이터 바인딩을 하는데, 기존에 있던 문자열을 유지해야 한다면
      1. 백틱 `${}` 을 사용 :class="`filter-item ${filter}`"
      2. 기존 문자열을 따옴표로 감싸준 뒤 + 를 사용해서 이어줌 (공백 필수) "'filter-item ' + filter"
      3. class 를 하나 더 만들어줌 :class="filter" class="filter-item" 처럼
  -->
	<div :class="'filter-item ' + filter" :style="`background-image: url(${img})`"></div>
</template>
<script>
export default {
	name: "FilterBox",
	data() {
		return {
    };
	},
	props: {
    img: String,
    filter: String,
  },
	components: {},
};
</script>
<style>
.filter-item {
	width: 100px;
	height: 100px;
	margin: 10px 10px 10px auto;
	padding: 8px;
	display: inline-block;
	color: white;
	background-size: cover;
	background-position: center;
}
</style>
