import { Propulsor } from '@/models/propulsor'
import Vue from 'vue'
import Vuex from 'vuex'
import { Coet } from './../models/coet'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coet1: new Coet ("32WESSDS", [10, 30, 80], 1),
    coet2: new Coet ("LDSFJA32", [30, 40, 50, 50, 30, 10], 1),
    prueba: 0,
    coet: new Coet("", [10], 1),
    coets: new Array<Coet>(),
    propulsorArray: new Array<number>()
  },
  getters: {
    getPrueba(state){
      return state.prueba;
    },
    getCoet(state){
      return state.coet;
    },
    getCoets(state){
      return state.coets;
    }
  },
  mutations: {
    setPrueba(state, value: number){
      state.prueba = value;
    },
    setCoets(state: any, coet: Coet){
      state.coets.push(coet);
    },
    setCoetCodi(state: any, codi: string){
      state.coet._codi = codi;
    },
    setPropMax(state:any, value: number) {
      for (let i = 0; i < state.coet._propulsors.length; i++) {
        if (state.coet._propulsors[i]._idPropulsor === (i+1)) {
          state.coet._propulsors[i]._maxpower = value;
        }
      }
    },
    setNewProp(state, propulsor:Propulsor){
      state.coet._propulsors.push(propulsor);
    },
    cleanValue(state){
      state.coet._codi= "";
      state.coet._propulsors = [];
      state.coet._img = 1;
    }
  },
  actions: {
    changePrueba(context, value:number){
      context.commit("setPrueba", value);
    },
    changeCoetCodi(context, codi: string){
      context.commit("setCoetCodi", codi);
    },
    cleanCoet(context){
      context.commit("cleanValue")
    },
    changePropMax(context, value: number){
      context.commit("setPropMax", value);
    },
    addCoet(context, coet: Coet) {
      context.commit("setCoets", coet);
    },
    addProp(context, propulsor:Propulsor){
      context.commit("setNewProp", propulsor);
    }
  },
  modules: {
  }
})