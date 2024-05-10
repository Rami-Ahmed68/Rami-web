<template>
    <div :class="`update-skill-form-${this.$store.state.mood}`">
        <div class="header">
            <icon icon="xmark" @click="this.$store.commit('OpenUpdateSkillForm')"/>
            <h1>Update Skill</h1>
            <loadingAnimationVue v-if="this.$store.state.DataLOaded"/>
        </div>

        <label for="title">Skill Title</label>
        <input type="text" id="title" placeholder="Type Here Skill Title" v-model="this.title">

        <input type="file" id="icon" multiple ref="fileInputRef" accept="image/*">
        <label for="icon" id="upload-file">
            <icon icon="image" />
            <p>select icon</p>
            <p>{{ selectedFile.length || 0 }}</p>
        </label>

        <button @click="UpDateskill">Update</button>
    </div>
</template>

<script>
import axios from "axios";
import loadingAnimationVue from '../global/loadingAnimation.vue'
export default {
    name : "update-skill-form",
    components : {
        loadingAnimationVue
    },
    data() {
        return {
            formData : new FormData(),
            title : this.$store.state.skillData.title,
            selectedFile : "",
        }
    },
    mounted() {
        this.$refs.fileInputRef.addEventListener('change', this.handleFileChange);
    },
    methods : {
        // catch selected icons
        handleFileChange(event) {
            this.selectedFile = event.target.files;

            // add the images as array in formData
            this.formData.append("images" , this.selectedFile[0] , this.selectedFile[0].name);
        },

        // update skill method
        async UpDateskill() {

            this.$store.state.DataLOaded = true;
            // add the admin id to the form data
            this.formData.append("adminId" , this.$store.state.adminInfo.admin._id);
            // add the new title to the form data
            this.formData.append("title" , this.title);
            // add the new title to the form data
            this.formData.append("skillId" , this.$store.state.skillData._id);

            // create a headers 
            const headers = {
                Authorization : `Bearer ${this.$store.state.adminInfo.token}`
            }

            try {
                // send the request using axios
                await axios.put( this.$store.state.UpdateSkillsApi , this.formData , { headers })
                .then(() => {
                    // to stope the loading animation
                    this.$store.state.DataLOaded = false;

                    // to update all the geted skills
                    this.$store.dispatch("GetSkills");

                    this.$store.state.updateSkill = false;
                }).catch((error) => {
                    // to open the error form
                    this.$store.state.errorMessage = error.response.data.message;

                    // to stope the loading animation
                    this.$store.state.DataLOaded = false;

                    // to close the update skill form
                    this.$store.state.updateSkill = false;
                });
            } catch (error) {
                    // to open the error form
                    this.$store.state.errorMessage = error.response.data.message;

                    // to stope the loading animation
                    this.$store.state.DataLOaded = false;

                    // to close the update skill form
                    this.$store.state.updateSkill = false;
            }
        }
    }
}
</script>