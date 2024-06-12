import { createApp } from 'vue'
import App from './App.vue'

// mitt 라이브러리 세팅
// npm install mitt
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App); // app : vue 설정을 다루는 부분
app.config.globalProperties.emitter = emitter; // 모든 컴포넌트가 mitt 라이브러리 사용하게 함

// vuex 사용
import store from './store';

app.use(store).mount('#app') // 모든 컴포넌트에서 store 공유

