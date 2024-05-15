<template>
  <div :class="`about-page-${this.$store.state.mood}`">
    <ErrorFormVue v-if="this.$store.state.errorMessage"/>
    <div class="up-account-cont">

      <!-- header section  -->
      <div class="header">
        <h1>Update Account</h1>
        <loadingAnimationVue v-if="this.$store.state.DataLoaded"/>
      </div>

      <label for="name">Name (optional)</label>
      <input type="text" id="name" placeholder="Type Here New Name" v-model="this.name">
      <label for="password">Password (optional)</label>
      <div class="password">
        <input :type="this.type" id="password" placeholder="Type Here New Password" v-model="this.password">
        <icon icon="eye" @click="ChangeType"/>
      </div>

      <button @click="UpdateAccount">Update</button>

    </div>
  </div>
</template>

<script>
import loadingAnimationVue from '@/components/global/loadingAnimation.vue'
import axios from 'axios'
import ErrorFormVue from '@/components/global/ErrorForm.vue'
export default {
  name : "AboutView",
  data() {
    return {
      name : "",
      password : "",
      type : "password"
    }
  },
  components : {
    loadingAnimationVue,
    ErrorFormVue
  },
  methods : {
    ChangeType() {
      this.type = this.type == "password" ? "text" : "password"
    },

    async UpdateAccount() {
      // to start the loading animation
      this.$store.state.DataLoaded = true;

      // create body data 
      const data = {
        adminId : this.$store.state.adminInfo.admin._id,
        name : this.name,
        password : this.password
      }

      try {
        await axios.put(this.$store.state.UpdateAccountApi , data )
        .then((response) => {

          // update admin token in store
          this.$store.state.adminInfo.token = response.data.token;

          // update admin name in store
          this.$store.state.adminInfo.name = response.data.admin.name;

          // to tope the loading animation
          this.$store.state.DataLoaded = false;

        // empeting the inputs values
        this.name = "";
        this.password = "";

        if (response.status == 200) {
          alert("Name And Password Updated Successfully")
        }

        }).catch((error) => {
        // to open the error form 
          this.$store.state.errorMessage = error.response.data.message;

          // to tope the loading animation
          this.$store.state.DataLoaded = false;
        })
      } catch(error) {
          // to open the error form 
          this.$store.state.errorMessage = error.response.data.message;

          // to tope the loading animation
          this.$store.state.DataLoaded = false;
      }
    }
  }
}
</script>
