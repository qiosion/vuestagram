import { createApp } from 'vue'
import App from './App.vue'

// mitt 라이브러리 세팅
// npm install mitt
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App); // app : vue 설정을 다루는 부분
app.config.globalProperties.emitter = emitter; // 모든 컴포넌트가 mitt 라이브러리 사용하게 함

// vuex 사용
// npm install vuex --save
import store from './store';

// Progressive Web App : 모바일기기에서 웹을 앱처럼 사용가능하게 함. 앱 설치도 가능
// vue add pwa
import './registerServiceWorker'
// num run build
// 빌드하면 dist 폴더에 html, css, js 파일이 생성됨
// manifest.json : 앱의 정보
// service-worker.js : 실제 모바일 앱은 인터넷 없어도 사용 가능. 그것을 pwa가 가능하게 해줌
// precache-manifest.js : 하드에 저장해 둘 파일들 -> 오프라인 상태에서도 앱 사용가능
// 불변 세팅은 vue.config.js 에 pwa 항목 추가

app.use(store).mount('#app') // 모든 컴포넌트에서 store 공유

