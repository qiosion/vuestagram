<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step--">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li @click="step++">Next</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container :instaData="instaData" :step="step" :img="img" />
  <button @click="more" class="viewMore">view more</button>

  <!-- <div class="selectTap">
    <button @click="step = 0">0</button>
    <button @click="step = 1">1</button>
    <button @click="step = 2">2</button>
  </div> -->

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

export default {
  name: 'App',
  data() {
    return {
      instaData: instaData,
      cnt: 0,
      // tab: 0,
      step: 0,
      img: '',
    }
  },
  components: {
    Container,
  },
  methods: {
    upload(e) {
      let file = e.target.files; // files 에 업로드한 파일 전체가 담겨있음

      // 업로드한 이미지를 다음 페이지로 보내고 띄우는 법
      // 1. FileReader() : 파일을 글자로 변환
      // 2. URL.createObjectURL() : 이미지의 가상 URL을 생성(호스팅)
      let url = URL.createObjectURL(file[0]);
      console.log("url : ", url)
      this.img = url; // url을 Container 에 props로 보내기 위해 data의 return 에 변수를 추가하고, 거기에 url을 대입

      // 이미지 업로드 후 다음 스텝으로 넘어감
      this.step++; // 이거 했더니 1에서 시작하면 2로가서 안되겠음
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
  }
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
