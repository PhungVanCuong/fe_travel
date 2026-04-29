import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layout/wrapper/index.vue'
import Client from './layout/wrapper/client.vue'
import HuongDanVien from './layout/wrapper/HuongDanVien.vue'
import Blank from './layout/wrapper/master_blank.vue'
import { Toaster } from "@meforma/vue-toaster";
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

const app = createApp(App)

app.use(router)
app.use(Toaster, {
    position: "top-right",
});
app.component("default-layout", Default);
app.component("client-layout", Client);
app.component("huong-dan-vien-layout", HuongDanVien);
app.component("blank-layout", Blank);

app.mount("#app")