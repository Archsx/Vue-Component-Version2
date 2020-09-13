import Cascader from "./Cascader.vue";
import Vue from "vue";

import options from "../../assets/district/data.js";

import _ from "lodash";

let initData = _.cloneDeep(options);
initData.forEach((ele) => [delete ele.children]);

function findNode(id, arr) {
  let node;
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    let target = arr[i];
    if (target.id === id) {
      return target;
    } else {
      if (target.children) {
        node = findNode(id, target.children);
        if (node) {
          return node;
        }
      }
    }
  }
  return node;
}

new Vue({
  el: "#app",
  components: {
    Cascader,
  },
  methods: {
    loadData(item) {
      return new Promise((resolve, reject) => {
        const result = _.cloneDeep(findNode(item.id, options));
        setTimeout(() => {
          resolve(result);
        }, Math.random() * 1000);
      });
    },
  },
  data() {
    return {
      selected: [],
      options: initData,
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
