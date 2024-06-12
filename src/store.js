// vuex : 데이터를 한 곳에서 관리. 파일명은 관습적으로 store.js
import { createStore } from 'vuex'
import instaData from './assets/instaData.js'

const store = createStore({
  state() { // vuex 에서는 data 가 아니라 staste로 하겠음
    // 데이터 사용 시에는 {{ $store.state.변수명 }}
    return {
      name: 'kim',
      age: 20,
      instaData: instaData,
    }
  },
  // vuex 데이터는 컴포넌트 안에서 직접 데이터를 수정하는 일이 없도록 주의하자
  // api 를 통해서만 수정하기~~!
  // 1. store.js 에 state 수정 방법 정의
  //    mutations 항목 안에 함수형식으로 작성한다. 이때 파라미터가 꼭 필요하고, 그것은 위의 state 오브젝트를 뜻함
  // 2. 데이터 수정을 실행할 컴포넌트에서 $store.commit('동작할 함수명') 함수를 이용해 요청
  //    $store.commit('함수명', 데이터) 로 데이터를 전달할 수 있음
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
  },
})

export default store