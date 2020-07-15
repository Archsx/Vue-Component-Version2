import Vue from "vue";
import Layout from "./Layout.vue";
import Header from "./Header.vue";
import Content from "./Content.vue";
import Footer from "./Footer.vue";
import Sider from "./Sider.vue";

new Vue({
  el: "#app",
  components: {
    "g-layout":Layout,
    "g-header":Header,
    "g-content":Content,
    "g-footer":Footer,
    "g-sider":Sider,
  },
});
