<template>
    <div :class="`skills-${this.$store.state.mood}`" >
        <!-- skills container title  -->
        <h1 class="title">Skills</h1>

        <!-- create skill button  -->
        <CreateSkillComponentVue />

        <!-- skill  -->
        <div class="skill" v-for="(skill , index) in this.$store.state.skills" :key="index" >
            <SkillOptionsComponentVue v-if="this.$store.state.adminInfo" :skill="skill"/>
            <!-- skill icon -->
            <img :src="skill.icon" alt="skill-icon" >
            <!-- skill name -->
            <h2>{{ skill.title }}</h2>
        </div>
    </div>
</template>

<script>
import SkillOptionsComponentVue from './SkillOptionsComponent.vue'
import CreateSkillComponentVue from './CreateSkillComponent.vue';
export default {
    name : "skills-component",
    components : {
        SkillOptionsComponentVue,
        CreateSkillComponentVue
    },
    async mounted() {
        await this.$store.dispatch("GetSkills");
    },
}
</script>
