<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div class="d-flex flex-column align-items-start">
      <div class="d-flex align-items-center text-white" v-for="coet in coets" :key="coet.id">
        <transition name="carreraok" :duration="10000">
          <!-- <p class="card text-dark ">{{ coet._codi }}</p> -->
          <img v-if="show" id="imgCursa" :src="coet.getImage(imgArray[coet._img-1])" alt="">
        </transition>
        <!-- <div v-if="coet._curpower < 9" class="carrera">
          <p class="card text-dark ">{{ coet._codi }}</p>
          <img id="imgCursa" :src="coet.getImage(imgArray[coet._img-1])" alt="">
        </div>
        <div v-else-if="coet._curpower < 19" class="carrera20">
          <p class="card text-dark">{{ coet._codi }}</p>
          <img id="imgCursa" :src="coet.getImage(imgArray[coet._img-1])" alt="">
        </div> -->
      </div>
    </div>

    <div id="control" class="bg-white p-2 w-100">
      <form class="form-inline">
        <div class="form-group">
          <label for="codi" class="font-weight-bold mr-2">Coet</label>
          <select name="codi" id="codi" class="form-control mr-3">
            <option
              v-for="coet in coets"
              :value="coet._codi"
              :key="coet.id"
              >{{ coet._codi }}</option
            >
          </select>
        </div>
        <!-- <button
          id="btAccelerar"
          type="button"
          class="btn btn-primary btn-sm ml-1 mr-1"
          @click="accelerar"
        >
          Accelerar
        </button>
        <button
          id="btFrenar"
          type="button"
          class="btn btn-primary btn-sm ml-1 mr-1"
          @click="frenar"
        >
          Frenar
        </button> -->
        <button
          id="btIniciar"
          type="button"
          class="btn btn-primary btn-sm ml-1 mr-1"
          @click="iniciCursa()"
        >
          Iniciar
        </button>
        <!-- <button
          id="btAturar"
          type="button"
          class="btn btn-danger btn-sm ml-1 mr-2"
          @click="aturarCursa"
        >
          Aturar
        </button>
        <button id="btTornar" type="button" class="btn btn-danger btn-sm" @click="tornar">
          Tornar
        </button> -->
      </form>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Vuex from 'vuex';
import Rocket from './../components/Rocket.vue';
import PropulsorComponent from '../components/PropulsorComponent.vue';
import { Coet } from './../models/coet';
import { Propulsor } from './../models/propulsor';

Vue.use(Vuex)

@Component({
  components: {
    Rocket,
    PropulsorComponent,
  },
})
export default class Home extends Vue {
  coet1 = new Coet("12345678", [20, 30], 2);
  coet2 = new Coet("qwertyui", [20, 30], 2);
  coets = new Array<Coet>();
  // coets = new Array<Coet>();
  imgArray= ["rocket01", "rocket02", "rocket03", "rocket04", "rocket05", "rocket06"];
  show = false

  mounted(): void {
      // this.coets = this.$store.getters.getCoets;
      this.coets.push(this.coet1);
      this.coets.push(this.coet2);
  }

  get getCoets(): Coet[] {
    const rockets = this.$store.getters.getCoets();
    const coets: Coet[] = [];

    for (const rocket of rockets) {
      coets.push(rocket);
    }

    return coets;
  }

  iniciCursa(){
    let codi: HTMLInputElement = (document.getElementById("codi"));
    this.show = true;
    for (let i = 0; i < this.coets.length; i++) {
      if (codi.value === this.coets[i]._codi) {
        this.coets[i].accelerar();
        console.log(this.coets[i]._curpower)
      }
      
    }
  }
  
}
</script>

<style>
.about{
  background-image: url("./../assets/images/backgroud-space.jpg");
  height: 100vh;
}

#imgCursa{
 width: 100px;
}

.carreraok-enter-active {
  animation: carrera 30s linear 0s;
}

.carrera{
  animation: carrera 30s linear 0s;
}

@keyframes carrera {
  from{
        transform: translateX(0px);
    }
    to{
        transform: translateX(calc(100vw - 10vmin));
    }
}

.carrera20{
  animation: carrera20 20s linear 0s;
}

@keyframes carrera20 {
  from{
        transform: translateX(0px);
    }
    to{
        transform: translateX(calc(100vw - 10vmin));
    }
}

/* carrera-enter-active {
  animation: translateY .5s;
} */
</style>
