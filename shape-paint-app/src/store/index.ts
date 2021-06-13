import Vue from 'vue'
import Vuex from 'vuex'
import Canvas from '@/store/modules/Canvas'

Vue.use(Vuex)
const store = new Vuex.Store( {
  
  modules: {
    Canvas
    
  }
})
export default store