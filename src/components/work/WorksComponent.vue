<template>
    <div :class="`create-work-${this.$store.state.mood}`">
            <h1 class="title">Works</h1>

            <div class="create-work" @click="this.$store.commit('OpenCreatingWorkForm')">
                <icon icon="plus" />
                <p>create work</p>
            </div>

            <loadingAnimationVue />

            <div class="work" v-for="(work , index) in this.$store.state.works" :key="index" :id="work._id">
                <WorkOptionsComponentVue @click="setWorkData(work)" v-if="this.$store.state.adminInfo"/>
                <router-link :to="`/work/${work._id}`">
                    <img :src="work.images[0]" alt="image">
                    <h1>{{ work.title }}</h1>
                    <p>{{ work.description.slice(0 , 70) }} <span v-if="work.description.length > 70">...</span></p>
                </router-link>
            </div>
    </div>
</template>

<script>
import loadingAnimationVue from '../global/loadingAnimation.vue'
import WorkOptionsComponentVue from './WorkOptionsComponent.vue'
export default {
    name : "create-work-component",
    components : {
        loadingAnimationVue,
        WorkOptionsComponentVue
    },
    async mounted() {
        await this.$store.dispatch("GetWorks")
    },
    methods : {
        setWorkData(work) {
            this.$store.state.workData = work;
            console.log("seted ...")
        }
    }
}
</script>