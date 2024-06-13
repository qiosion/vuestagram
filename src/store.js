// vuex : 데이터를 한 곳에서 관리. 파일명은 관습적으로 store.js
import { createStore } from 'vuex'
import instaData from './assets/instaData.js'
import axios from 'axios';

// 데이터 정의 state() { return { key: value } }
// 데이터 수정 mutations: { 함수명(state, 파라미터) {} }
// ajax 요청 actions: { 함수명() {} }
const store = createStore({
  state() { // vuex 에서는 data 가 아니라 staste로 하겠음
    // 데이터 사용 시에는 {{ $store.state.변수명 }}
    return {
      name: 'kim',
      age: 20,
      instaData: instaData,
      more: {}, // 더보기로 가져온 게시물. object 자료형
    }
  },
  // vuex 데이터는 컴포넌트 안에서 직접 데이터를 수정하는 일이 없도록 주의하자
  // api 를 통해서만 수정하기~~!
  // 1. store.js 의  mutations 항목 안에 state 수정 방법을 함수형식으로 정의
  //   이때 파라미터가 꼭 필요하고, 그것은 위의 state 오브젝트를 뜻함
  // 2. 데이터 수정을 실행할 컴포넌트에서 $store.commit('동작할 함수명') 함수를 이용해 요청
  //    또는 $store.commit('함수명', 데이터) 로 데이터를 전달할 수 있음
  mutations: {
    liked(state, i) { // 배열의 i번째를 찾아서 써야함
      // $store.commit 으로 보낼 때 i 를 보내야함 -> 즉 더 위의 부모컴포넌트에서 i 값을 전송해줘야함
      if(state.instaData[i].liked) { // 좋아요 취소
        state.instaData[i].likes--;
        state.instaData[i].liked = false;
      } else { // 좋아요
        state.instaData[i].likes++;
        state.instaData[i].liked = true;
      }
    },
    plusAge(state, data) { // plusAge(state, data) 처럼, 아규먼트로 보낸 데이터를 파라미터로 사용가능
      state.age += data;
    },
    changeName(state) { // 파라미터 state는 위의 state 오브젝트를 뜻함
      state.name = 'park';
    },
    setMore(state, data) {
      state.more = data;
    },
  },
  // vuex 에서 ajax 또는 오래 걸리는 작업들을 actions 에서 함.
  //    ajax 같은 비동기방식은 의도치 않은 버그를 발생시킬 수 있음.
  //    그러므로 mutations 는 순수하게 state 변경만 하는 함수로 두고, actions 함수에 ajax를 작성한다
  // 1. store.js 의 actions 항목에 힘수 작성
  //    이때 파라미터 context는 $store 을 뜻함. 관습적 작명
  // 2. 실행할 컴포넌트에서 $store.dispatch('실행할 함수명') 을 이용해 ajax 요청
  actions: {
    getData(context) {
      axios.get('https://codingapple1.github.io/vue/more0.json')
      .then((result) => {
        console.log("result : ", result.data);

        // 이렇게 가져온 데이터를 more 이라는 object에 저장하고싶다
        // == state를 변경하고싶다 => mutations 에 함수 정의
        context.commit('setMore', result.data);
      })
    },
  },
})

export default store