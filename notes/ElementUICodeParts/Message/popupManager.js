import Vue from "vue";

let hasModal = false;
let hasInitZIndex = false;
let zIndex = 2000;

/**
 * 这个函数我现在还不清楚到底有啥用，看起来就像是获取一个div dom
 * 要么是新的div，要么就是已经存在的div
 * 经过测试，这里的Modal好像真的就是指代的modal这样的弹窗，而且这个modalDom答应出来确实是一个div
 */
const getModal = function() {
  if (Vue.prototype.$isServer) {
    return;
  }
  let modalDom = PopupManager.modalDom;
  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    modalDom = document.createElement("div");
    PopupManager.modalDom = modalDom;

    modalDom.addEventListener("touchmove", function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
  return modalDom;
};

const instances = {};

const PopupManager = {
  modalFade: true,
  getInstance(id) {
    return instances[id];
  },
  register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  nextZIndex() {
    return PopupManager.zIndex++;
  },
  modalStack: [],
  doOnModalClick() {
    const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) {
      return;
    }
    // 这段第一次看的时候不太明白，为什么这里取实例还要通过这样的方式呢，直接返回topItem不就好了？
    // 原因:这里的数据之间的联系是这样的 每个实例，都有一个id,我怀疑是形式都是 实例类型_数字 比如message_1
    // 如何管理这些在页面上如 “弹窗” 一般表现的实例呢？这里就使用了一个对象PopupManager来管理这些实例(register,getInstance,deregister等等操作可以证明)
    // 然后这个PopupManager对象上有个属性叫做modalStack,这是个数组,其实是栈
    // 这个modalStack用来管理在页面上还在显示的实例的，
    // 但是这个modalStack里面存放的不是实例，而是和实例有关的对象 {id,zIndex,modalClass}
    // 所以这里取实例才需要PopupManager.getInstance(topItem.id)
    const instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },
  openModal(id, zIndex, dom, modalClass, modalFade) {
    if (Vue.prototype.$isServer) {
      return;
    }
    if (!id || zIndex === undefined) {
      return;
    }
    this.modalFade = modalFade;

    const modalStack = this.modalStack;

    // 第一次见下面这个循环的时候，不知道是有啥用
    // 记得for循环，break是终止当前循环，进入下一次循环
    // return的话就结束这个openModal函数了
    // 这大概是防止这个实例本身就存在于页面上吧，假如是这样的话，函数直接return就好了
    // 另外，多说一句，假如使用forEach的话，return的话是终止当前循环然后进入下一次循环，但是forEach不能使用break
    for (let i = 0; i < modalStack.length; i++) {
      const item = modalStack[i];
      if (item.id === id) {
        return;
      }
    }


    // 获取一个div作为添加动画的容器？
    const modalDom = getModal();

    /**  和动画有关，暂时不明白*/
    addClass(modalDom, "v-modal");

    if (this.modalFade && !hasModal) {
      addClass(modalDom, "v-modal-enter");
    }

    if (modalClass) {
      let classArr = modalClass.trim().split(/\s+/);
      classArr.forEach((item) => addClass(modalDom, item));
    }

    setTimeout(() => {
      removeClass(modalDom, "v-modal-enter");
    }, 200);
    /**  和动画有关，暂时不明白*/

    /**挂载到页面上 */
    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }
    /**挂载到页面上 */

    /**设置style */
    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.tabIndex = 0;
    modalDom.style.display = "";
    /**设置style */

    /**入栈 */
    this.modalStack.push({
      id,
      zIndex,
      modalClass,
    });
    /**入栈 */
  },

  closeModal(id) {
    const modalStack = this.modalStack;
    const modalDom = getModal();

    // 假如页面上现在有modal
    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1];
      // 关闭的是最上层的modal
      if (topItem.id === id) {
        // 删除class?
        if (topItem.modalClass) {
          let classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach((item) => removeClass(modalDom, item));
        }
        // 出栈
        modalStack.pop();

        if (modalStack.length > 0) {
          //这句是在干嘛？
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {

        // 关闭的不是最上层的modal
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    // 假如现在页面上没有modal?
    // 下面的逻辑不太懂
    if (modalStack.length === 0) {
      if (this.modalFade) {
        addClass(modalDom, "v-modal-leave");
      }
      setTimeout(() => {
        if (modalSstack.elngth === 0) {
          if (modalDom.parentNode) {
            modalDom.parentNode.removeChild(modalDom);
          }
          modalDom.style.display = "none";
          PopupManager.modalDom = undefined;
        }
        removeClass(modalDom, "v-modal-leave");
      }, 200);
    }
  },
};

Object.defineProperty(PopupManager, "zIndex", {
  configurable: true,
  get() {
    if (!hasInitZIndex) {
      zIndex = zIndex || 2000;
      hasInitZIndex = true;
    }
    return zIndex;
  },
  set(value) {
    zIndex = value;
  },
});

const getTopPopup = function() {
  if (PopupManager.modalStack.length > 0) {
    const topPopup =
      PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topPopup) {
      return;
    }
    const instance = PopupManager.getInstance(topPopup.id);

    return instance;
  }
};

if (!Vue.prototype.$isServer) {
  // handle `esc` key when the popup is shown
  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      const topPopup = getTopPopup();

      if (topPopup && topPopup.closeOnPressEscape) {
        topPopup.handleClose
          ? topPopup.handleClose()
          : topPopup.handleAction
          ? topPopup.handleAction("cancel")
          : topPopup.close();
      }
    }
  });
}


export PopupManager