import Vue from 'vue'

// 使用一個空的 Vue 實例作為事件中心
var bus = new Vue()

// 定義 Vue prototype 的 $bus 屬性存取描述器（Accessor descriptor）
// 方便 event bus 被任何子元件使用
Object.defineProperty(Vue.prototype, '$bus', {
  get() {
    return this.$root.bus
  }
})

export default bus
