<template>
  <div class="home">

    <button
      type="button"
      class="btn btn-lg btn-primary m-5 animate__animated animate__flip"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      Pulsa para Fabricar els coets
    </button>

    <div v-if="coetsHome.length != 0" id="listCoet" class="row d-flex align-content-center justify-content-center">
      <div v-for="coet in coetsHome" :key="coet.id" class="d-flex justify-content-center">
       <Rocket :coet="coet" :rocket="imgArray" /> 
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <img src="./../assets/images/astronauta.png" alt="" class="mr-2 animate__animated animate__bounceInLeft">
      <button class="btn btn-primary mr-3 animate__animated animate__tada" @click="carregarCursa">Cursa</button>
    </div>

    <!-- ***************************************Modal********************************* -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Fabrica el Coet núm. {{ coetsHome.length + 1 }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <!-- Formulario per crear coet -->
            <form>
              <div class="form-group">
                <label for="codiCoet">Codi del coet</label>
                <input
                  type="text"
                  class="form-control"
                  id="codiCoet"
                  v-model.trim="codi"
                />
              </div>
              <div id="errorCodi" class="invalid-feedback text-danger">El codi ha de tenir 8 caracteres</div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Color</label>
                  <select class="form-control" v-model="selected">
                    <option disabled value="">Please select one</option>
                    <option style="background-color: blue">1</option>
                    <option style="background-color: pink">2</option>
                    <option style="background-color: orange">3</option>
                    <option style="background-color: green">4</option>
                    <option style="background-color: purple">5</option>
                    <option style="background-color: red">6</option>
                </select>
              </div>
              <div id="errorColor" class="invalid-feedback text-danger">Campo obligatori</div>
              <div class="form-group">
                <label for="propulCoet">Núm. propulsors del coet</label>
                <input
                  type="number"
                  class="form-control"
                  id="numProp"
                  v-model.number="numPropulsors"
                  @blur="creatBasic()"
                />
              </div>
              <div id="errorProp" class="invalid-feedback text-danger">Compo obligatori</div>
              <div v-if="numPropulsors > 0">
                <div v-for="propulsor in numPropulsors" :key="propulsor.id">
                  <propulsor-component :propulsor="setProp(propulsor)" @addPower="insertProp(powerProp, propulsor)" />
                </div>
              </div>

              <button type="button" class="btn btn-primary animate__animated animate__pulse" @click="creatCoet()">Submit</button>
              <button v-if="coetsHome.length != 0" type="button" class="btn btn-success m-2" data-dismiss="modal"> Ver coets fabricats</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- <button class="btn btn-primary m-2" @click="click(coet1)">Create Rocket 1</button>

    <button class="btn btn-primary m-2" @click="click(coet2)">Create Rocket 2</button>

    <button class="btn btn-primary m-2" @click="currentPower = coet.accelerar()">Acelerar</button>

    <button class="btn btn-primary m-2" @click="currentPower = coet.frenar()">Frenar</button>

    <button class="btn btn-primary m-2" @click="veureInfoCoet(coet)">Veure</button>

    <button class="btn btn-primary m-2" @click="veureTotsCoets(coet)">Veure Tot</button>

    <div v-if="infoCoet" id="infoRocket" >
      <Rocket :coet="coet"/>
    </div>

    <div v-if="currentPower != 0" id="infoCursa">
      El coet {{ coet._codi }} va una velocitat de {{ currentPower }}
    </div> -->
    
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
  infoCoet = false;
  infoPower = false;
  coet= this.$store.state.coet;
  currentPower = 0;
  coet1 = this.$store.state.coet1;
  coet2 = this.$store.state.coet2;
  codi = "";
  numPropulsors = 0;
  coetsHome = new Array<Coet>();
  colorProp = 0;
  imgArray= ["rocket01", "rocket02", "rocket03", "rocket04", "rocket05", "rocket06"];
  selected = "";

  // powerProp = 10;
  // propulsorNew = new Propulsor(1, 10);

  // created(): void {

  //   this.$store.dispatch("putCohets", this.$store.state.coets);
  //   // if (cohets.size === 0) {
  //   //   this.btCursaDisabled = true;
  //   // } else {
  //   //   this.btCursaDisabled = false;
  //   // }
  // }

  creatBasic() :void{
      
      for (let i = 1; i < this.numPropulsors+1; i++) {
        this.coet.addPropulsor(10)        
      }

  }

  creatCoet() :void{
    let color = parseInt(this.selected);
    let propulsorStar: Array<number> = [];

    // Resetear
    let codiCoet: HTMLElement | null = document.getElementById("codiCoet");
    let numProp:  HTMLElement | null = document.getElementById("numProp");
    let errorCodi: HTMLElement | null= document.getElementById("errorCodi");
    let errorProp: HTMLElement | null= document.getElementById("errorProp");
    let errorForm = 0;

    if (this.codi.length != 8) {
        codiCoet.classList.add("is-invalid");
        errorCodi.classList.remove("invalid-feedback");
        errorForm++;
    }

    if(this.selected === ""){
      errorForm++
    }

    if (this.numPropulsors === 0) {
        numProp.classList.add("is-invalid");
        errorProp.classList.remove("invalid-feedback");
        errorForm++;
    }

    if (errorForm === 0) {
      let coetNew= new Coet (this.coet._codi, this.coet._propulsors[0], color);
      for (let i = 0; i < this.coet._propulsors.length; i++) {
      coetNew.addPropulsor(this.coet._propulsors[i]._maxpower);
      }
      this.coetsHome.push(coetNew);
      console.log(coetNew)
      console.log(this.coetsHome)
      alert("S'ha creado " + coetNew._codi);
      this.cleanCoet();
      numProp.classList.remove("is-invalid");
      codiCoet.classList.remove("is-invalid");
      errorCodi.classList.add("invalid-feedback");
      errorProp.classList.add("invalid-feedback");
      }else{
        alert("Datos incompleto")
      }
      
    }

  cleanCoet() :void{
    this.codi = "";
    this.selected = "";
    this.numPropulsors = 0;
    this.$store.dispatch("cleanCoet");
  }

  setProp(value: number) :Propulsor{
    let propulsor = new Propulsor(value, 10);
    this.$store.dispatch("changeCoetCodi", this.codi);
    return propulsor;
  }

  insertProp(powerProp: number, propulsor: number){
    let prop = new Propulsor(propulsor, 10);
    let verify = false;
    for (let i = 0; i < this.$store.state.coet._propulsors.length; i++) {
      if (this.$store.state.coet._propulsors[i]._idPropulsor === (propulsor-1)) {
        this.$store.dispatch("changePropMax", powerProp);
        verify = true;
      }      
    }

    if(!verify){
      this.$store.state.coet._propulsors.push(prop);
    }
  }

  carregarCursa(): void {
    this.$store.state.coets = this.coetsHome.slice();
    this.$router.push("/cursa"); 
  }

 
}
</script>

<style>
.home{
  height: 100vh;
  background-image: url("./../assets/images/fabrica-de-coets.jpg");
  background-position: center;
}

</style>
