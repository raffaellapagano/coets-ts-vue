<template>
  <div>
    <div class="card m-2" id="cardRocket">
      <img :src="coet.getImage(rocket[coet._img-1])" class="card-img-top" alt="rocket" @click="prueba(coet._img)" />
      <div class="card-body">
          <h5>{{ coet._codi }}</h5>
        <p class="card-text">
            {{ coet._propulsors.length}} propulsors i màxima potencia de {{ coet.getMaxPower() }}
        </p>
      </div>
    </div>

    <!-- <p id="info">Rocket {{ coet._codi}} booster max power {{ coet.getMaxPower() }}
        </p> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Vuex from "vuex";
import { Coet } from "../models/coet";

export default Vue.extend({
  props: {
    coet: Coet,
    rocket: Array
  },
  data(){
      return{
          imgArray: ["./../assets/images/rocket01.png", "./../assets/images/rocket02.png"]
      }
  }
});
</script>

<style>
#cardRocket{
  width: 10rem; 
  background: rgb(245, 243, 243, 0.9)
}
</style>