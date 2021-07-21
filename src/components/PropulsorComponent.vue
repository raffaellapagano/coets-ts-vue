<template>
    <div>
        <p>Propulsor núm.{{ propulsor._idPropulsor}} amb potencia máxim de 
                    <input
                    type="number"
                    class="form-control"
                    id="powerProp"
                    v-model.number="powerProp"
                    @blur="changePropulsor(propulsor._idPropulsor)"
                    /> </p> 
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import Vuex from 'vuex';
import { Propulsor } from "./../models/propulsor";

Vue.use(Vuex)

@Component
export default class PropulsorComponent extends Vue {
  powerProp = 10;

  @Prop() public propulsor!: number;

  changePropulsor(id: number){
      let newId = id-1;
      this.$store.state.coet._propulsors[newId].setPropulsorPower(this.powerProp);
  }
</script>