<template>
    <div class="skills-options-cont">
        <icon icon="ellipsis-vertical" class="kebab" @click="OpenUpdateForm"/>

        <ul class="skills-options-list" :id="this.optiosStatus">
            <li @click="OpenCloseUpdateOptions">Update <icon icon="pen-to-square" /></li>
            <li @click="OpenCloseDeleteOptions">Delete <icon icon="trash" /></li>
        </ul>
    </div>
</template>

<script>
export default {
    name : "skills-options",
    props : ['skill'],
    data() {
        return {
            optiosStatus : 'close',
        }
    },
    methods : {
        // to open the skills options list
        OpenUpdateForm() {
            this.optiosStatus = this.optiosStatus == 'close' ? 'open' : 'close';
        },

        OpenCloseUpdateOptions() {
            // open or close the update skill form
            this.$store.commit('OpenUpdateSkillForm');

            this.optiosStatus = this.optiosStatus == 'close' ? 'open' : 'close';

            // set the skill data to the skillData in store 
            this.$store.state.skillData = this.skill;
        },

        OpenCloseDeleteOptions() {
            // to open delete skill form
            this.$store.commit("OpenDeleteSkillForm");

            this.optiosStatus = this.optiosStatus == 'close' ? 'open' : 'close';

            // set the skill data to the skillData in store 
            this.$store.state.skillData = this.skill;
        }
    }
}
</script>
