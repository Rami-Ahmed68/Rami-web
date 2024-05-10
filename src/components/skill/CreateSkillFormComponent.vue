<template>
        <div :class="`create-skill-${this.$store.state.mood}`">
            <div class="header">
                <icon icon="xmark" @click="this.$store.commit('OpenCreateSkillForm')"/>
                <h1>Create Skill</h1>
                <loadingAnimationVue v-if="this.$store.state.DataLoaded"/>
            </div>

            <label for="title">Skill Title</label>
            <input type="text" id="title" placeholder="Type Here Skill Title" v-model="this.title">

            <input type="file" id="icon" multiple ref="fileInputRef" accept="image/*">
            <label for="icon" id="upload-file">
                <icon icon="image" />
                <p>select icon</p>
                <p>{{ selectedFile.length || 0 }}</p>
            </label>

            <button @click="CreateSkill">Update</button>
        </div>
</template>

<script>
import axios from 'axios'
import loadingAnimationVue from '../global/loadingAnimation.vue'
export default {
    name : "create-skill",
    data() {
        return {
            selectedFile : "",
            formData : new FormData(),
            title : "",
        }
    },
    components : {
        loadingAnimationVue
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

        async CreateSkill() {
            // to start the loading animation
            this.$store.state.DataLoaded = true;

            // add the admin id to formData
            this.formData.append("adminId" , this.$store.state.adminInfo.admin._id);
            // add the title to formData
            this.formData.append("title" , this.title);

            // create headers to send it in request
            const headers = {
                Authorization : `Bearer ${this.$store.state.adminInfo.token}`
            }

            try {

                axios.post(this.$store.state.CreateSkillAPI , this.formData , { headers })
                .then(() => {
                    // to update all geted skills
                    this.$store.dispatch("GetSkills");

                    // to stope the loading animtion
                    this.$store.state.DataLoaded = false;

                    this.$store.commit("OpenCreateSkillForm");
                }).catch((error) => {
                    console.log(error)
                    // to open the error form
                    this.$store.state.errorMessage = error.response.data.message;
                    // to stope the loading animation
                    this.$store.state.DataLoaded = false;
                    // to close the create skill form
                    this.$store.commit("OpenCreateSkillForm");
                })

            } catch (error) {
                console.log(error)
                // to open the error form
                this.$store.state.errorMessage = error.response.data.message;
                // to stope the loading animation
                this.$store.state.DataLoaded = false;
                // to close the create skill form
                this.$store.commit("OpenCreateSkillForm");
            }
        }
    }
}
</script>
