<template>
  <div class="header">
    <ul class="header-button-left">
      <li v-if="step != 0" @click="step--">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">Pub</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!--
      Vuex 데이터 수정 방법
      1. store.js 에 state 수정 방법 정의
        mutations 항목 안에 함수형식으로 작성한다. 이때 파라미터가 꼭 필요하고, 그것은 위의 state 오브젝트를 뜻함
      2. 데이터 수정을 실행할 컴포넌트에서 $store.commit('동작할 함수명') 함수를 이용해 요청
        $store.commit('함수명', 데이터) 로 데이터를 전달할 수 있음
  -->
  <p>
    안녕, {{ $store.state.name }} ! {{ $store.state.age }}
  </p>
  <button @click="$store.commit('changeName')">
    Name
  </button>
  <!-- <button @click="$store.commit('plusAge', 10)"> -->
  <button @click="plusAge(10)">
    Age
  </button>

  <!--
      하위 -> 상위 데이터 전달
      1. custom event : 자식 컴포넌트 -> 부모 컴포넌트 데이터 전달
          textArea 에서 작성한 내용을 emit 으로 보냄(newContent 라는 변수명으로 지정, $event.target.value 라는 값)
          근데 부모 컴포넌트에서 받을 때는 그냥 $event 만 사용. emit 한거 수신하는 문법으로, 정해져있는 값
      
      2. mitt 라이브러리 : 컴포넌트 -> 타 컴포넌트 단계 상관없이 한번에 데이터 전달 (형제, 부모의 부모 등)
          npm install mitt
          main.js 에서 mitt 라이브러리 세팅

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
      3. Vuex : mitt로 너무 많이 쓰게되면 관리가 힘듦. 대체품
          npm install vuex --save
          main.js 에서 vuex 세팅
          데이터를 한 곳에서 관리. 파일명은 관습적으로 store.js 라고 함

          데이터 정의 state() { return { key: value } }
          데이터 수정 mutations: { 함수명(state, 파라미터) {} }
              $store.commit('실행함수명', 파라미터)
          ajax 요청 actions: { 함수명() {} }
              $store.dispatch('실행함수명')
  -->
  <Container :instaData="instaData" :step="step" :img="img" @newContent="newContent = $event" :selectedFilter="selectedFilter" />
  <!-- <button @click="more" class="viewMore">view more</button> -->
  <!-- <p>{{ $store.state.more }}</p> -->
  <button @click="$store.dispatch('getData')" >view more</button>

  <!-- <div class="selectTap">
    <button @click="step = 0">0</button>
    <button @click="step = 1">1</button>
    <button @click="step = 2">2</button>
  </div> -->

  <!-- <h4>재렌더링 횟수 : {{ counter }}</h4>
  <p>now1() : {{ now1() }}</p>
  <p>now2 : {{ now2 }}</p>
  <button @click="counter++">렌더링</button>
  <p>{{ name }}</p>
  <p>{{ instaData }}</p>
  <p>{{ cnt }}</p> -->


  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" multiple accept="image/*"
      type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">UPLOAD</label>
    </ul>
  </div>
<!--
  <div v-if="tab == 0">0</div>
  <div v-if="tab == 1">1</div>
  <div v-if="tab == 2">2</div>

  <button @click="tab = 0">0</button>
  <button @click="tab = 1">1</button>
  <button @click="tab = 2">2</button>
-->

</template>

<script>
// npm install axios
import axios from 'axios';
import instaData from './assets/instaData.js'
// 다른곳에서 쓰거나, 라우터로 나누거나, html이 너무 길어질 때 컴포넌트 생성
import Container from './components/Container.vue'
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      instaData: instaData,
      cnt: 0,
      // tab: 0,
      step: 3,
      img: '',
      newContent: '',
      selectedFilter: '',
      counter: 0, // now 함수 재 렌더링을 위한 변수
    }
  },
  // 컴포넌트 별로 Composition API 와 Options API 선택 가능성
  // 기존에 쓰던 방식이 Options API
  // Composition API 쓰면 관련있는 코드를 한 곳에 모을 수 있음
  components: {
    Container,
  },
  mounted() {
    this.emitter.on('selectedFilter', (filter) => { // mitt 을 이용한 데이터 전송
      this.selectedFilter = filter;
    });
  }, 
  // 함수 정의
  // 1. methods: {} : 사용할 때마다 새로 실행됨(일반적인 함수)
  // 1-1. mapMutations()
  //    store된 mutations 를 한번에 꺼내 쓸 때 사용
  //    mapMutations()는 vuex의 함수이므로 import 가 필요함
  //    mapMutations(['', '']) 
  //    다른 함수와 함께 쓰려면 ...mapMutations(['']) 와 같이 ... 이 필요
  // 1-2. mapActions()
  //    store된 actions 를 한번에 꺼내 쓸 때 사용
  //    mapActions(['', '']) 
  //    다른 함수와 함께 쓰려면 ...mapActions(['']) 와 같이 ... 이 필요

  // 2. computed: {} : 사용해도 새로 실행되지 않고 기존 값 유지
  //    함수라기보다 데이터 계산 결과를 저장하는 공간이라고 생각하자. state data와 같은 취급 하면 됨
  //    vue 파일이 처음 로드됐을 때 모두 한번씩 실행하고, 그 값을 간직함
  //    그 후 함수 호출하면 처음 로드됐을 때의 값을 반환함 (컴퓨팅 파워를 아낌. 자원절약)
  //    호출할 때 소괄호 쓰면 안되고, 반드시 return
  //    store.js에 저장된 state들을 꺼내 쓸 때 자주 사용
  // 2-1. mapState()
  //    mapState() 를 이용해 state 를 개별적으로 가져오는게 아니라 한번에 꺼내 쓸
  //    mapState()는 vuex의 함수이므로 import 가 필요함
  //    mapState(['', ''], ..) 와 같이 배열 안에 내가 가져오려는 state를 작성
  //    또는 mapState({키: 값, ..}) 와 같이 object 형식으로 작성 가능
  //    다른 computed 함수와 함께 쓰려면 ...mapState(['']) 와 같이 ... 이 필요
  methods: { // 일반적인 함수
    publish() { // 발행
      var newPost = {
        name: "Sun Kang",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.img,
        likes: 0,
        date: "June 11",
        liked: false,
        content: this.newContent,
        filter: this.selectedFilter
      };
      this.instaData.unshift(newPost); // unshift : 배열의 시작점에 삽입
      this.step = 0;
    },
    upload(e) {
      let file = e.target.files; // files 에 업로드한 파일 전체가 담겨있음

      // 업로드한 이미지를 다음 페이지로 보내고 띄우는 법
      // 1. FileReader() : 파일을 글자로 변환
      // 2. URL.createObjectURL() : 이미지의 가상 URL을 생성(호스팅)
      let url = URL.createObjectURL(file[0]);
      this.img = url; // url을 Container 에 props로 보내기 위해 data의 return 에 변수를 추가하고, 거기에 url을 대입

      // 이미지 업로드 후 다음 스텝으로 넘어감
      this.step++;
    },
    more() {
      axios.get('https://codingapple1.github.io/vue/more' + this.cnt + '.json') // get 요청
      .then((result) => { // 요청 성공 시 실행할 코드(콜백함수)
        console.log("result : ", result);
        this.instaData.push(result.data); // 기존 데이터에 새로 가져온 값을 추가
        this.cnt++;
        if (this.cnt % 2 == 0) this.cnt = 0;
        else this.cnt = 1;
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      })
    },
    now1() {
      return new Date()
    },
    // mapMutations()는 vuex의 함수이므로 import 가 필요함
    // mutations 를 개별적으로 가져오는게 아니라 한번에 꺼내 쓸 수 있음
    // 배열 또는 오브젝트 안에 내가 가져오려는 mutation 작성
    ...mapMutations(['plusAge']), // 다른 함수와 함께 쓰려면 ... 이 필요함
  },
  computed: { // 제일 처음 로드될 때 실행하고, 그 값을 유지
    // store.js에 저장된 state들을 꺼내 쓸 때 자주 사용
    // 호출할 때 소괄호 쓰면 안됨
    now2() {
      return new Date()
    },
    name() {
      return this.$store.state.name
    },
    age() {
      return this.$store.state.age
    },
    // mapState()는 vuex의 함수이므로 import 가 필요함
    // state 를 개별적으로 가져오는게 아니라 한번에 꺼내 쓸 수 있음
    // 배열 또는 오브젝트 안에 내가 가져오려는 state를 작성
    ...mapState(['cnt', 'instaData']), // 다른 computed 함수와 함께 쓰려면 ... 이 필요함
  },
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}

button {
  border: transparent;
}

.viewMore {
  width: 100%;
  height: 30px;
  margin: 10px 0;
}

.selectTap {
  text-align: center;
}
.selectTap button {
  margin: 0 10px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  color: skyblue; 
}
</style>
