<template>
    <div>
        <p class="card text-dark">{{ coet._codi }}</p>
        <img id="imgCursa" :src="coet.getImage(imgArray[coet._img-1])" alt="">
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import Vuex from 'vuex';
import { Coet } from "./../models/coet"

Vue.use(Vuex)

@Component
export default class cursaRocket extends Vue {


    @Prop() public coet!: Coet;
    @Prop() public imgArray!: Array<string>;
}
</script>

<style>
#imgCursa{
 width: 100px;
}
</style>