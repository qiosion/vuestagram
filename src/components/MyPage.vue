<template>
	<div style="padding: 10px">
		<h4>팔로워</h4>
		<input placeholder="🔍" />
		<div v-for="(a,i) in follower" :key="i" class="post-header">
			<div class="profile" :style="`background-image: url(${a.image});`" ></div>
			<span class="profile-name">{{ a.name }}</span>
		</div>
	</div>
</template>
<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  name: 'MyPage',
  // Composition API : setup() 안에 코드 작성
  // life cycle의 created() hook과 비슷. 컴포넌트 생성 전에 먼저 실행할 코드
  // 여기에서 데이터 생성, 조작, methods, hook, computed, watch 등 거의 모든걸 작성 가능
  setup() { 
    // 데이터 생성 ref(데이터) : import 필요
    // 모든 데이터를 reference data type 으로 감싸야 실시간 반영 가능(재렌더링)
    // 데이터를 return {} 하여야 사용 가능
    let follower = ref([]);

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