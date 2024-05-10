<template>
    <div class="login-page" :id="`${this.$store.state.mood}-page`">
        <LogOutBtnComponentVue v-if="this.$store.state.adminInfo"/>
        <ErrorFormVue v-if="this.$store.state.errorMessage"/>
        <div class="log-form" v-if="!this.$store.state.adminInfo">
            <!-- loading animation  -->
            <loadingAnimationVue v-if="this.$store.state.DataLoaded"/>
            <!-- loading animation  -->
                <h1>Log in</h1>
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Type your email here" v-model="this.email">
                <label for="password">Password</label>
                <div class="pass">
                    <input :type="this.passStatus" id="password" placeholder="Type your passwrod here" v-model="this.password">
                    <icon :icon="iconType" @click="changePassStatus"/>
                </div>
                <button @click="LogiN"> Log in </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import loadingAnimationVue from '@/components/global/loadingAnimation.vue';
import ErrorFormVue from '@/components/global/ErrorForm.vue';
import LogOutBtnComponentVue from '@/components/global/LogOutBtnComponent.vue';
export default {
    name : "login-page",
    data() {
        return  {
            mood : this.$store.state.mood,
            // mood : window.localStorage.getItem("mood"),
            passStatus : 'password',

            // eye icon type
            iconType : "eye",

            // email
            email : "",

            // password
            password : "",

            // error message
            errorMessage : ""
        }
    },
    components : {
        loadingAnimationVue,
        LogOutBtnComponentVue,
        ErrorFormVue
    },
    methods : {
        // show or hidd password value
        changePassStatus() {
            // change eye icon type
            this.iconType = this.iconType == "eye" ? "eye-slash" : "eye"
            // change password input type
            this.passStatus = this.passStatus == "password" ? "text" : "password" 
        },

        // Log in method
        LogiN() {
            // start loading animation
            this.$store.state.DataLoaded = true;
            axios.post(this.$store.state.LogInApi , {
                email : this.email,
                password : this.password
            }).then((response) => {

                // save the admin info in localStorag
                window.localStorage.setItem("adminInfo" , JSON.stringify(response.data));

                // stope loading animation
                this.$store.state.DataLoaded = false;

                // send the admin to dach bord
                window.location = "/dash"

            }).catch((error) => {
                // stope loading animation
                this.$store.state.DataLoaded = false;

                // update error message value
                this.errorMessage = error.response.data.message;

                // empting email and password values
                this.email = "";
                this.password = "";

                // set the error message to the errorMessage var in store 
                this.$store.state.errorMessage = error.response.data.message;
            });
        }
    }
}
</script>
