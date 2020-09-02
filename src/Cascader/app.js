import Cascader from "./Cascader.vue";
import Vue from 'vue'

new Vue({
  el: "#app",
  components: {
    Cascader,
  },
  data() {
    return {
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
              children: [
                {
                  value: "xihu",
                  label: "West Lake",
                  code: 752100,
                },
              ],
            },
          ],
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing",
              children: [
                {
                  value: "zhonghuamen",
                  label: "Zhong Hua Men",
                  code: 453400,
                },
              ],
            },
          ],
        },
      ],
    };
  },
});
