<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div class="d-flex flex-column align-items-start">
      <div class="d-flex align-items-center text-white font" v-for="coet in coets" :key="coet.id">
        <p class="card text-dark">{{ coet._codi }}</p>
        <img id="imgCursa" :src="coet.getImage(imgArray[coet._img-1])" alt="">
      </div>
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
  coets = new Array<Coet>();
  imgArray= ["rocket01", "rocket02", "rocket03", "rocket04", "rocket05", "rocket06"];

  mounted(): void {
      this.coets = this.$store.getters.getCoets;
  }

  get getCoets(): Coet[] {
    const rockets = this.$store.getters.getCoets();
    const coets: Coet[] = [];

    for (const rocket of rockets) {
      coets.push(rocket);
    }

    return coets;
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
</style>
