<template>
    <div :class="`works-page-${this.$store.state.mood}`">
        <loadingAnimationVue v-if="!this.$store.state.works"/>
        <div class="works" v-if="this.$store.state.works != ''">
            <h1 class="section">Works <span>{{ this.$store.state.works.length}}</span></h1>

                <div class="work" v-for="(work , index) in this.$store.state.works" :key="index">
                    <router-link :to="`/work/${work._id}`">
                        <img :src="work.images[0]" alt="cover" >
                        <h1>{{ work.title }}</h1>
                        <p>{{ work.description.slice(0 , 60) }} <span v-if="work.description.length > 60">...</span></p>
                    </router-link>
                </div>

        </div>
    </div>
</template>

<script>
import loadingAnimationVue from '@/components/global/loadingAnimation.vue';
export default {
    name : "works-page",
    mounted() {
        this.$store.dispatch("GetWorks");
    },
    components : {
        loadingAnimationVue
    }
}
</script>
