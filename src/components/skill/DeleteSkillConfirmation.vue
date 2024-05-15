<template>
    <div :class="`delete-skill-form-${this.$store.state.mood}`">
        <div class="header">
            <h1>Delete Skill</h1>
            <loadingAnimationVue v-if="this.$store.state.DataLoaded"/>
        </div>

        <button class="delete" @click="DeleteSkill">Delete</button>
        <button class="cancel" @click="this.$store.commit('OpenDeleteSkillForm')">Cancel</button>
    </div>
</template>

<script>
import axios from "axios";
import loadingAnimationVue from '../global/loadingAnimation.vue'
export default {
    name : "delete-skill",
    components : {
        loadingAnimationVue
    },
    methods : {
        async DeleteSkill() {
            // to start the loading animation
            this.$store.state.DataLoaded = true;

            // create headers to sedn it in request
            const headers = {
                Authorization : `Bearer ${this.$store.state.adminInfo.token}`
            };

            // create body data
            const data = {
                adminId : this.$store.state.adminInfo.admin._id,
                skillId : this.$store.state.skillData._id
            }

            // send the request
            try {
                await axios.delete(this.$store.state.DeleteSkillAPI , { data , headers })
                .then(() => {
                    // to update all geted skills
                    this.$store.dispatch("GetSkills");

                    // to stope the loading animation
                    this.$store.state.DataLoaded = false;

                    // to close the delete skill form 
                    this.$store.state.deleteSkillForm = false;

                }).catch((error) => {
                    // to start the loading animation
                    this.$store.state.DataLoaded = false;

                    // to open the error form
                    this.$store.state.errorMessage = error.response.data.message;

                    // to close the delete skill form 
                    this.$store.state.deleteSkillForm = false;
                })
            } catch (error) {
                // to stope the loading animation
                this.$store.state.DataLoaded = false;

                // to open the error form
                this.$store.state.errorMessage = error.response.data.message;

                // to close the delete skill form 
                this.$store.state.deleteSkillForm = false;
            }
        }
    }
}
</script>
