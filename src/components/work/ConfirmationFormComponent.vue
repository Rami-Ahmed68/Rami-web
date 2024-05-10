<template>
    <div :class="`confirmation-${this.$store.state.mood}`">
            <div class="header">
                <h1>Confirmation</h1>
                <loadingAnimationVue v-if="this.$store.state.DataLoaded"/>
            </div>
        <button class="delete" @click="DeleteWork">Delete</button>
        <button class="cancel" @click="this.$store.commit('OpenConfirmation')">Cancel</button>
    </div>
</template>

<script>
import axios from "axios";
import loadingAnimationVue from '../global/loadingAnimation.vue'
export default {
    name : "confirmation-form",
    components : {
        loadingAnimationVue
    },
    methods : {
        async DeleteWork() {
            console.log("request sende ...");
            // to start the loading animation
            this.$store.state.DataLoaded = true;
            console.log(this.$store.state.adminInfo.admin._id)

            // craete headers to send it in request
            const headers = {
                Authorization : `Bearer ${this.$store.state.adminInfo.token}`
            }

            // create body data to send it in request
            const data = {
                adminId : this.$store.state.adminInfo.admin._id,
                workId : this.$store.state.workData._id
            }

            try {
                await axios.delete(this.$store.state.DeleteWorkApi , {
                    data ,
                    headers
                })
                .then((response) => {
                    console.log(response);

                    // to update all geted works
                    this.$store.dispatch("GetWorks");

                    // to close the confirmation form
                    this.$store.commit('OpenConfirmation');

                    // to start the loading animation
                    this.$store.state.DataLoaded = false;
                }).catch((error) => {
                    // to start the loading animation
                    this.$store.state.DataLoaded = false;

                    // to open the error from
                    this.$store.state.errorMessage = error.response.data.message;
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
