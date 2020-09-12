import Cascader from "./Cascader.vue";
import Vue from "vue";

import options from "../../assets/district/data.js";

new Vue({
  el: "#app",
  components: {
    Cascader,
  },
  methods: {
    loadData(item) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(item);
        }, 5000);
      });
    },
  },
  data() {
    return {
      selected: [],
      options,
      // options: [
      //   {
      //     value: "zhejiang",
      //     label: "Zhejiang",
      //     children: [
      //       {
      //         value: "hangzhou",
      //         label: "Hangzhou",
      //         children: [
      //           {
      //             value: "xihu",
      //             label: "West Lake",
      //             code: 752100,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     value: "jiangsu",
      //     label: "Jiangsu",
      //     children: [
      //       {
      //         value: "nanjing",
      //         label: "Nanjing",
      //         children: [
      //           {
      //             value: "zhonghuamen",
      //             label: "Zhong Hua Men",
      //             code: 453400,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    };
  },
});
