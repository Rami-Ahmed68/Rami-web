<template>
  <div :class="`about-page-${this.$store.state.mood}`">
    <div class="up-account-cont">

      <!-- header section  -->
      <div class="header">
        <h1>Update Account</h1>
        <loadingAnimationVue />
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
    loadingAnimationVue
  },
  methods : {
    ChangeType() {
      this.type = this.type == "password" ? "text" : "password"
    },

    async UpdateAccount() {

      // create body data 
      const data = {
        adminId : this.$store.state.adminInfo.admin._id,
        name : this.name,
        password : this.password
      }

    console.log(data)

      try {
        await axios.put(this.$store.state.UpdateAccountApi , data )
        .then((response) => {
          console.log(response);

          this.$store.state.adminInfo.token = response.data.token;
          this.$store.state.adminInfo.name = response.data.admin.name;

        }).catch((error) => {
          console.log(error)
        })
      } catch(error) {
        console.log(error)
      }
    }
  }
}
</script>
