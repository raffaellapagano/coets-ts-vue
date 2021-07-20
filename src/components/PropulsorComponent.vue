<template>
    <div>
        <p>Propulsor núm.{{ propulsor._idPropulsor}} amb potencia máxim de 
                    <input
                    type="number"
                    class="form-control"
                    id="powerProp"
                    v-model.number="powerProp"
                    @blur="addPropulsor(propulsor._idPropulsor)"
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

  addPropulsor(id: number){
      let verify = false;
      for (let i = 0; i < this.$store.state.coet._propulsors.length; i++) {
          if(this.$store.state.coet._propulsors[i]._idPropulsor === id){
              this.$store.dispatch("changePropMax", this.powerProp);
          verify = true;
          }
      }

      if(!verify){
      this.$store.dispatch("addProp", new Propulsor(id, this.powerProp));
      console.log(this.$store.state.coet);
      }
  }

//   @Emit()
//   addPropulsor(): void {
//     this.$emit("addPower", this.powerProp);
//   }
  
}


// import { Component, Vue } from "vue-property-decorator";
// import Vuex from 'vuex'
// import { Propulsor } from "../models/propulsor"

// Vue.use(Vuex)

// export default Vue.extend({
//     props: {
//         propulsor: Propulsor
//     },
//     data(){
//         return{
//             powerProp: 10,
//         }
//     }
// })
</script>