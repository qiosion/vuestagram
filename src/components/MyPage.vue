<template>
	<div style="padding: 10px">
		<h4>팔로워</h4>
		<input placeholder="🔍" />
    <!-- Post.vue 에서 적용했던 css가 여기도 먹힘
    왜? build 하면 여러 파일에 있던 css가 하나의 파일로 합쳐지기 때문
    그게 싫으면 <style scoped> 태그로 작성함. 그러면 다른 파일에 안먹힘 -->
		<div v-for="(a,i) in follower" :key="i" class="post-header">
			<div class="profile" :style="`background-image: url(${a.image});`" ></div>
			<span class="profile-name">{{ a.name }}</span>
		</div>
	</div>
</template>
<script>
import axios from 'axios';
import { ref, onMounted, reactive, toRefs, watch, computed } from 'vue';

export default {
  name: 'MyPage',
  props: {
    one: Number,
  },

  // Composition API : setup() 안에 코드 작성
  // life cycle의 created() hook과 비슷. 컴포넌트 생성 전에 먼저 실행할 코드
  //    여기에서 데이터 생성, 조작, methods, hook, computed, watch 등 거의 모든걸 작성 가능
  // 파라미터는 없거나 props, context 최대 2개까지 등록 가능
  //    첫번째 파라미터는 무조건 props (기존에 하던거처럼 props 등록해둬야함)
  //    context 는 attrs, slots, emit 등
  setup(props) {
    // 데이터 생성. import 필요. 기능적으로 큰 차이 없고 관습적으로 나눔
    // 1. ref(데이터) : 기본 자료형
    //    데이터를 return {} 하여야 사용 가능
    // 2. reactive() : array, object
    // 모든 데이터를 reference data type 으로 감싸야 실시간 반영 가능(재렌더링)
    let follower = ref([]);
    let test = reactive({});
    test;
    
    // 부모 -> 자식 데이터 전송 시 props 사용 가능
    // toRefs 를 통해서 여러 props 중에 뭘 사용할지 설정할 수 있음
    let { one } = toRefs(props); // ref 에 감싸지 않으면 실시간 반영이 되지 않음
    console.log("one : ", one.value);

    // watch(감시할데이터, () => { 데이터가 변경될 때마다 실행할 코드 })
    watch(one, () => {
      console.log("watch one : ", one);
    })

    // computed(() => { return 연산결과 })
    // return 결과를 변수에 담아도 일종의 object 취급을 하기 때문에 .value 로 값을 가져와야함
    let len = computed(() => {
      return  follower.value.length;
    })
    console.log("follower length : ", len.value);
    // 왜 0이냐? follower 배열은 ajax 요청을 통해서 값들이 추가됨
    // 근데 computed는 제일 처음에 페이지 로드할 때 실행하고, 그 값을 유지하는 함수
 
    // hook : 기존의 명칭 앞에 on 이 붙음. import 필요
    onMounted(() => {
      // ajax 요청
      axios.get('/follower.json') // public 에 있는 json파일을 이렇게 하면 불러올 수 있음 ??
      .then((result) => {
        // 데이터 변경 하기 위해서는 반드시 데이터.value 로 써야함
        // 데이터를 ref() 에 담아서 만들었으므로 일종의 object 안에 가뒀다고 보는 것
        follower.value = result.data;
      })
    })


    return { follower }
  },
}
</script>
<style>
</style>