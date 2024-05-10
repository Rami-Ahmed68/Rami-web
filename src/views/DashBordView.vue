<template>
    <div class="dash-page" :id="`dash-${this.$store.state.mood}-page`" v-if="this.$store.state.adminInfo">
        <INfoComponentVue v-if="this.$store.state.info"/>
        <UpdateInfoComponentVue v-if="this.$store.state.updateInfo"/>
        <ErrorFormVue v-if="this.$store.state.errorMessage"/>
        <WorkComponentVue />
        <CreateWorkFormComponentVue v-if="this.$store.state.createWork"/>
        <UpdateWorkComponentVue v-if="this.$store.state.updateWork"/>
        <ConfirmationFormComponentVue v-if="this.$store.state.confirmation"/>
        <UpdateSkillFormComponentVue v-if="this.$store.state.updateSkill"/>
        <SkillsComponentVue />
        <DeleteSkillConfirmationVue v-if="this.$store.state.deleteSkillForm"/>
        <CreateSkillFormComponentVue v-if="this.$store.state.createSkillForm"/>
    </div>
</template>

<script>
// work components
import INfoComponentVue from '@/components/info/INfoComponent.vue';
import ErrorFormVue from '@/components/global/ErrorForm.vue';
import WorkComponentVue from '@/components/work/WorksComponent.vue';
import CreateWorkFormComponentVue from '@/components/work/CreateWorkFormComponent.vue';
import UpdateInfoComponentVue from '@/components/info/UpdateInfoComponent.vue';
import UpdateWorkComponentVue from '@/components/work/UpdateWorkComponent.vue';
import ConfirmationFormComponentVue from '@/components/work/ConfirmationFormComponent.vue';
// work components

// skill components
import SkillsComponentVue from '@/components/skill/SkillsComponent.vue';
import UpdateSkillFormComponentVue from '@/components/skill/UpdateSkillFormComponent.vue';
import DeleteSkillConfirmationVue from '@/components/skill/DeleteSkillConfirmation.vue';
import CreateSkillFormComponentVue from '@/components/skill/CreateSkillFormComponent.vue';
// skill components

export default {
    name : "dash-bord",
    data() {
        return {
        }
    },
    async mounted() {
        if (!this.$store.state.adminInfo) {
            console.log(`this is admin info : ${this.$store.state.adminInfo}`)
            window.location = "/login";
        }
        await this.$store.dispatch("GetInfo");
    },
    components : {
        // work components
        INfoComponentVue,
        WorkComponentVue,
        ErrorFormVue,
        CreateWorkFormComponentVue,
        UpdateInfoComponentVue,
        UpdateWorkComponentVue,
        ConfirmationFormComponentVue,
        // work components

        // skill components
        SkillsComponentVue,
        UpdateSkillFormComponentVue,
        DeleteSkillConfirmationVue,
        CreateSkillFormComponentVue,
        // skill components
    },
    methods : {
    }
}
</script>
