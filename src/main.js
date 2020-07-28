import Vue from "vue";
import App from "./App.vue";
import axios from 'axios';
import AOS from "aos";
import VueKinesis from 'vue-kinesis'

import VueAxios from 'vue-axios';
import "aos/dist/aos.css";

Vue.use(VueAxios, axios);
Vue.use(VueKinesis);

Vue.config.productionTip = false;

new Vue({
    created(){
       AOS.init();
    },
    render: h => h(App)
}).$mount("#app");
