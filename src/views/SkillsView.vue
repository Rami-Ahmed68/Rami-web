<template>
    <div :class="`skills-page-${this.$store.state.mood}`">
        <loadingAnimationVue v-if="!this.$store.state.skills"/>
        <div class="skills-cont" v-if="this.$store.state.skills">
            <div class="message">
                <h2>my skills</h2>
            </div>
            <div class="skill" v-for="(skill , index) in this.$store.state.skills" :key="index">
                <img :src="skill.icon" alt="">
                <h2>{{ skill.title }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import loadingAnimationVue from '@/components/global/loadingAnimation.vue'
export default {
    name : "skills-page",
    components : {
        loadingAnimationVue
    },
    mounted() {
        this.$store.dispatch("GetSkills")
    }
}
</script>
