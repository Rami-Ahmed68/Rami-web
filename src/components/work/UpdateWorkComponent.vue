<template>
    <div class="create-work-form" ref="formContent">
        <div class="header">
            <icon icon="xmark" @click="this.$store.commit('openUpdateWork')"/>
            <h2>Edait Work Form</h2>
            <loadingAnimationVue v-if="this.$store.state.DataLoaded"/>
        </div>
        
        <label for="Title">Work Title</label>
        <input type="text" placeholder="Work Title" id="Title" v-model="this.title">

        <label for="Description">Work Description</label>
        <input type="text" placeholder="Work Description" id="Description" v-model="this.description">
        
        <label for="front_end">Front-end skills used in this project</label>
        <input type="text" id="front_end" placeholder="Type Here Front-end skills used in this project" v-model="this.front_end">
        
        <label for="back-end">Back-end skills used in this project</label>
        <input type="text" id="back_end" placeholder="Type Here Back-end skills used in this project" v-model="this.back_end">
        
        <label for="web">Web Link</label>
        <input type="text" id="web" placeholder="Type Here Work Web Link" v-model="this.web">
        
        <label for="ios">Ios App Link</label>
        <input type="text" id="ios" placeholder="Type Here Work Ios App Link" v-model="this.ios">
        
        <label for="android">Android App Link</label>
        <input type="text" id="android" placeholder="Type Here Work Android Link" v-model="this.android">
        
        <label class="radio" @click="SelectType('Work')"><input type="radio" name="radio-group" :checked="this.type === 'Work'" > Work </label>

        <label class="radio" @click="SelectType('Collaborations')"><input type="radio" name="radio-group" :checked="type === 'Collaborations'" > Collaborations </label>

        <label for="" class="work-images">Work Images length : {{this.$store.state.workData.images.length}}</label>

        <input type="file" id="images" multiple ref="fileInputRef" accept="image/*">
        <!-- select images cont  -->
        <label class="select-images" for="images">
            <icon icon="images" />
            <p>Select images</p>
            <p>{{ selectedFiles?.length || 0 }}</p>
        </label>

        <button @click="UpdateWork">Create</button>
    </div>
</template>

<script>
import loadingAnimationVue from '../global/loadingAnimation.vue';
import axios from "axios";

export default {
    name : "update-work",
    data() {
        return {
            selectedFiles : [],
            formData : new FormData(),
            admin : JSON.parse(window.localStorage.getItem("adminInfo")),
            title : this.$store.state.workData.title,
            description : this.$store.state.workData.description,
            type : this.$store.state.workData.type,
            front_end : this.$store.state.workData.front_end,
            back_end : this.$store.state.workData.back_end,
            web : this.$store.state.workData.web,
            ios : this.$store.state.workData.ios,
            android : this.$store.state.workData.android,
        }
    },    
    mounted() {
        this.$refs.fileInputRef.addEventListener('change', this.handleFileChange);
    },
    components : {
        loadingAnimationVue
    },
    methods : {
        handleFileChange(event) {
            this.selectedFiles = event.target.files;

            // add all images as array in formData
            for(let file of this.selectedFiles) {
                this.formData.append("images" , file , file.name);
            }
        },

        // update the work type
        SelectType(type) {
            this.type = type;
        },

        UpdateWork() {
            // move to top
            this.$refs.formContent.scrollTop = 0;

            // to start the loading animation
            this.$store.state.DataLoaded = true;

            // create headers to send it in request
            const headers = {
                Authorization : `Bearer ${this.admin.token}`
            }

            this.formData.append("adminId" , this.admin.admin._id);
            this.formData.append("workId" , this.$store.state.workData._id);
            this.formData.append("title" , this.title);
            this.formData.append("description" , this.description);
            this.formData.append("type" , this.type);
            this.formData.append("front_end" , this.front_end);
            this.formData.append("back_end" , this.back_end);
            this.formData.append("web" , this.web);
            this.formData.append("ios" , this.ios);
            this.formData.append("android" , this.android);

            try {
            axios.put(this.$store.state.UpdateWorkApi , this.formData , { headers }
            ).then(() => {
                    // to stope the loading animation
                    this.$store.state.DataLoaded = false;

                    // to update all geted works
                    this.$store.dispatch('GetWorks');

                    // open update work form
                    this.$store.commit('openUpdateWork');
                }).catch((error) => {
                    // to stope the loading animation
                    this.$store.state.DataLoaded = false;

                    // to open the error from
                    this.$store.state.errorMessage = error.response.data.message;

                    // open update work form
                    this.$store.commit('openUpdateWork');
                    })
            } catch(error) {
                // to stope the loading animation
                this.$store.state.DataLoaded = false;
                console.log(error)
            }
        }
    },
}
</script>
