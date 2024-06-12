<template>
  <!--
      : 를 이용해서 데이터 바인딩을 하는데, 기존에 있던 문자열을 유지해야 한다면
      1. 백틱 `${}` 을 사용 :class="`filter-item ${filter}`"
      2. 기존 문자열을 따옴표로 감싸준 뒤 + 를 사용해서 이어줌 (공백 필수) "'filter-item ' + filter"
      3. class 를 하나 더 만들어줌 :class="filter" class="filter-item" 처럼
  -->

	<div :class="'filter-item ' + filter"
  :style="`background-image: url(${img})`"
  @click="useThis(filter)">
  <!--
      mitt 를 이용한 데이터 전송
          methods: {
            this.emitter.emit('변수명', '전송할 데이터')
          }
      데이터 수신
          mounted() {
            this.emitter.on('변수명', () => { // 누가 변수명과 같은 이벤트 전송하면 실행할 코드를 아래에 작성
              // () 안에 이벤트할 때 들어있던 데이터를 파라미터로 넣을 수 있음
            })
          }
  -->
    <!--
        slot : 부모 -> 자식 데이터 전송 (props 외의 다른 방법)
            1. 자식 컴포넌트에 slot 태그를 생성
            2. 부모 컴포넌트에서 작성한 자식 컴포넌트 태그 사이에 데이터 작성
            slot 을 여러개 쓰고싶다면 name 속성을 사용하여 구분함
            2-1. 부모 컴포넌트에서 작성한 자식 컴포넌트 태그 사이에 template 태그 작성
            2-2. <template v-slot:슬롯이름>전송할 데이터</template>

        태그(html) 안에 데이터 바인딩 할 때만 slot 사용 가능. 속성 같은거에는 못씀
        또한, 전송할 데이터가 많을 경우 props 사용
    -->
    <slot></slot>
  </div>
</template>
<script>
export default {
	name: "FilterBox",
	data() {
		return {
    };
	},
  methods: {
    useThis(filter) {
      console.log("filter : ", filter)
      this.emitter.emit('selectedFilter', filter); // '변수명', '전송할 데이터'
    }
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
