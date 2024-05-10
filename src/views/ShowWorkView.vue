<template>
    <div :class="`work-page-${this.$store.state.mood}`">
        <loadingAnimationVue v-if="!this.$store.state.workData"/>
        <ErrorFormVue v-if="this.$store.state.errorMessage"/>
        <div class="work" v-if="this.$store.state.workData">
            <img :src="this.$store.state.workData.images[0]" alt="" v-if="this.$store.state.workData">
            <div class="header">
                <router-link to="/works">
                    Works 
                </router-link>
                <icon icon="arrow-right" />
                <h2>{{ this.$store.state.workData.title }}</h2>
                <p>{{ this.$store.state.workData.created_at.split("T")[0] }}</p>
            </div>

            <div class="description">
                <span>Description</span>
                <p>{{ this.$store.state.workData.description }}</p>
            </div>

            <div class="front-end" v-if="this.$store.state.workData.front_end"><span>Front-End </span> <p>{{ this.$store.state.workData.front_end }}</p></div>
            <div class="back-end" v-if="this.$store.state.workData.back_end"><span>Back-End </span> <p>{{ this.$store.state.workData.back_end }}</p></div>

            <div class="link" v-if="this.$store.state.workData.web"><span>Web  </span> <a :href="this.$store.state.workData.web" target="_blank">{{ this.$store.state.workData.web.split(".")[1] }}.{{ this.$store.state.workData.web.split(".")[2] }}</a></div>
            <div class="link" v-if="this.$store.state.workData.ios"><span>Ios </span> <a :href="this.$store.state.workData.ios" target="_blank">{{ this.$store.state.workData.ios.split(".")[1] }}.{{ this.$store.state.workData.ios.split(".")[2] }}</a></div>
            <div class="link" v-if="this.$store.state.workData.android"><span>Android </span> <a :href="this.$store.state.workData.android" target="_blank">{{ this.$store.state.workData.android.split(".")[1] }}.{{ this.$store.state.workData.android.split(".")[2] }}</a></div>
            <div class="type"><span>Type </span> <p>{{ this.$store.state.workData.type }}</p></div>
            <h3 v-if="this.$store.state.workData.images.length <= 1">No More Images</h3>
            <div class="images-cont" v-for="(image , index) in this.$store.state.workData.images.slice(1)" :key="index">
                <img :src="image" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import ErrorFormVue from '@/components/global/ErrorForm.vue';
import loadingAnimationVue from '@/components/global/loadingAnimation.vue';
export default {
    name : "show-work",
    data() {
        return {
            workId : ""
        }
    },
    created() {
        // catch the work id from url and set it to the workId in store
        this.$store.state.workId = this.$route.params.id;
        // to delete old workData value
        this.$store.state.workData = "";
    },
    mounted() {
        this.$store.dispatch("GetWork");
        window.scrollTo(0 , 0);
    },
    components : {
        ErrorFormVue,
        loadingAnimationVue
    }
}
</script>
