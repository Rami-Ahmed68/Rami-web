<template>
    <div class="create-work-form" ref="formContent">
        <div class="header">
            <icon icon="xmark" @click="this.$store.commit('OpenCreatingWorkForm')"/>
            <h2>Create Work Form</h2>
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
        
        <label class="radio" @click="SelectType('Work')"><input type="radio" name="radio-group"> Work </label>

        <label class="radio" @click="SelectType('Collaborations')"><input type="radio" name="radio-group"> Collaborations </label>

        <input type="file" id="images" multiple ref="fileInputRef" accept="image/*">
        <!-- select images cont  -->
        <label class="select-images" for="images">
            <icon icon="images" />
            <p>Select images</p>
            <p>{{ selectedFiles?.length || 0 }}</p>
        </label>
        
        <button @click="CreateWork">Create</button>
    </div>
</template>

<script>
import asxio from "axios";
import loadingAnimationVue from '../global/loadingAnimation.vue';

export default {
    name : "create-work-form-component",
    data() {
        return {
            selectedFiles : [],
            formData : new FormData(),
            admin : JSON.parse(window.localStorage.getItem("adminInfo")),
            title : "",
            description : "",
            type : "",
            front_end : "",
            back_end : "",
            web : "",
            ios : "",
            android : "",
        }
    },
    components : {
        loadingAnimationVue
    },
    methods: {
        handleFileChange(event) {
            this.selectedFiles = event.target.files;

            // add all images as images in formData 
            for (const file of this.selectedFiles) {
                this.formData.append('images', file , file.name);
            }
        },

        // change the work type on click on the radio input
        SelectType(type) {
            this.type = type;
        },

        async CreateWork() {
            // to move to the top
            this.$refs.formContent.scrollTop = 0;

            try {
                    this.$store.state.DataLoaded = true;
                    console.log(`Request Sended ...`)

                    // add data to from data
                    this.formData.append("adminId" , this.admin.admin._id);
                    this.formData.append("title" , this.title);
                    this.formData.append("description" , this.description);
                    this.formData.append("front_end" , this.front_end);
                    this.formData.append("back_end" , this.back_end);
                    this.formData.append("web" , this.web);
                    this.formData.append("ios" , this.ios);
                    this.formData.append("android" , this.android);
                    this.formData.append("type" , this.type);

                    console.log(typeof this.back_end)
                    // headers
                    const headers = {
                        Authorization : `Bearer ${this.admin.token}`,
                    };

                    await asxio.post(this.$store.state.CreateWorkAPi , this.formData , { headers })

                    .then(() =>{
                        // to stope the loading animation
                        this.$store.state.DataLoaded = false;

                        // to close the creating work form
                        this.$store.state.createWork = false;

                        // to update all geted works
                        this.$store.dispatch('GetWorks')
                    }).catch((error) =>{
                        // to stope the loading animation
                        this.$store.state.DataLoaded = false;
                        // to open and pass the error message to the error form
                        this.$store.state.errorMessage = error.response.data.message;
                    });
            } catch(error) {
                    // to open and pass the error message to the error form
                    this.$store.state.errorMessage = error.response.data.message;
            }
        }
    },
    mounted() {
        this.$refs.fileInputRef.addEventListener('change', this.handleFileChange);
    },
}
</script>
