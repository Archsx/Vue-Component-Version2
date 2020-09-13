let data = require("./db.json");
let fs = require("fs");
let path = require("path");
const filePath = path.resolve(__dirname, "./data.json");

let res = data;

let indexTree = res.reduce((obj, ele) => {
  let id = ele.id;
  obj[id] = ele;
  return obj;
}, {});

let result = res.reduce((arr, ele) => {
  let pid = ele.pid;
  let parentNode = indexTree[pid];
  if (parentNode) {
    parentNode.children
      ? parentNode.children.push(ele)
      : (parentNode.children = [ele]);
  } else if (pid === 0) {
    arr.push(ele);
  }
  return arr;
}, []);


function judgeLeaf(arr){
  arr.forEach(ele=>{
    if(ele.children){
      ele.isLeaf = false
      judgeLeaf(ele.children)
    }else{
      ele.isLeaf = true
    }
  })
}

judgeLeaf(result)



fs.writeFileSync(filePath, JSON.stringify(result));
