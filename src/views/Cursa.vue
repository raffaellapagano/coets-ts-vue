<template>
  <div class="about">

    <div class="d-flex flex-column align-items-start pt-3">
      <div class="d-flex align-items-center text-white" v-for="coet in coets" :key="coet.id">

        <div v-if="coet._curpower < 9">
          <p class="card bg-dark text-success border border-success mt-4">{{ coet._codi }}</p>
          <img id="imgCursa" :src="coet.getImage(imgArray[coet._img-1])" alt="">
        </div>        
        <div v-else-if="coet._curpower < 19" class="carrera">
          <p class="card text-dark ">{{ coet._codi }}</p>
          <img id="imgCursa" :src="coet.getImage(imgArray[coet._img-1])" alt="">
        </div>
        <div v-else-if="coet._curpower < 29" class="carrera20">
          <p class="card text-dark">{{ coet._codi }}</p>
          <img id="imgCursa" :src="coet.getImage(imgArray[coet._img-1])" alt="">
        </div>
        <div v-else-if="coet._curpower < 39" class="carrera10">
          <p class="card text-dark">{{ coet._codi }}</p>
          <img id="imgCursa" :src="coet.getImage(imgArray[coet._img-1])" alt="">
        </div>
        <div v-else-if="coet._curpower <49" class="animate__animated animate__bounceInRight">
          <p class="card text-dark">{{ coet._codi }}</p>
          <img id="imgCursa" :src="coet.getImage(imgArray[coet._img-1])" alt="">
        </div>
        <div v-else-if="coet._curpower >48" class="animate__animated animate__zoomInRight">
          <p class="card text-dark">{{ coet._codi }}</p>
          <img id="imgCursa" :src="coet.getImage(imgArray[coet._img-1])" alt="">
        </div>
      </div>
    </div>

    <div id="control" class="card bg-dark p-2 justify-content-center border border-success">
      <form class="form-inline">
        <div class="form-group">
          <label for="codi" class="font-weight-bold mr-2 text-success">Coet</label>
          <select name="codi" id="codi" class="form-control mr-3 bg-dark text-success border border-success">
            <option
              v-for="coet in coets"
              :value="coet._codi"
              :key="coet.id"
              >{{ coet._codi }}</option
            >
          </select>
        </div>
        <button
          id="btIniciar"
          type="button"
          class="btn btn-success ml-1 mr-1 text-dark"
          @click="accelerarCoet()"
        >
          Accelerar
        </button>
        <button
          id="btIniciar"
          type="button"
          class="btn btn-success ml-1 mr-1 text-dark"
          @click="frenarCoet()"
        >
          Frenar
        </button>
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

  accelerarCoet(){
    let codi: HTMLInputElement = (document.getElementById("codi"));
    this.show = true;
    for (let i = 0; i < this.coets.length; i++) {
      if (codi.value === this.coets[i]._codi) {
        this.coets[i].accelerar();
        console.log(this.coets[i]._curpower)
      }
      
    }
  }

  frenarCoet(){
    let codi: HTMLInputElement = (document.getElementById("codi"));
    this.show = true;
    for (let i = 0; i < this.coets.length; i++) {
      if (codi.value === this.coets[i]._codi) {
        this.coets[i].frenar();
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

#control{
    position: fixed;
    left: 5px;
    bottom: 5px;
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

.carrera10{
  animation: carrera10 10s linear 0s;
}

@keyframes carrera10 {
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
