<template>
  <div :class="`home-page-${this.$store.state.mood}`">
      <loadingAnimationVue v-if="!this.$store.state.info"/>
    <div class="home-cont" v-if="this.$store.state.info">
      <h3 class="message">{{ this.$store.state.message1 }} </h3>

      <div class="header">
        <div class="mes">
            <h1>{{ this.$store.state.name }}</h1>
            <h3>{{ this.$store.state.message2 }}</h3>
        </div>
        <img src="../assets/rami.jpg" alt="">
      </div>

      <div class="work">
        <h2 class="title">Work</h2>
        <p>{{ this.$store.state.info.work }}</p>
      </div>

      <div class="bio">
        <h1>Bio</h1>
        <p v-for="(line , index) in this.$store.state.info.bio[0].split('.')" :key="index">{{ line }}.</p>
      </div>

      <div class="love">
        <h1>I Love</h1>
        <p>{{ this.$store.state.info.love }}</p>
      </div>

      <div class="links">
        <div class="scoial">
          <h1>On social media</h1>
            <p>          
              <a :href="`${this.$store.state.instagram}`" target="_blacnk">
              <img src="../assets/instagram2.png" alt="">
              @ramiahmed.68
            </a>
          </p>
          <p>
            <a :href="`${this.$store.state.discord}`" target="_blacnk">
              <img src="../assets/discord.png" alt="">
              @ramiahmed.68
            </a>
          </p>
          <p>
            <a :href="`${this.$store.state.linkedin}`" target="_blacnk">
              <img src="../assets/linkedin.png" alt="">
              @ramiahmed
            </a>
          </p>
        </div>
      </div>

      <div class="github">
        <h1>GitHub</h1>
        <a :href="`${this.$store.state.github}`" target="_blacnk">
          <img src="../assets/github.png" alt="">
          @ramiahmed.68
        </a>
      </div>

      <div class="problem">
        <h1>Problem Solving</h1>
        <a :href="`${this.$store.state.codewars}`" target="_blanck">
          <img src="../assets/codewars.png" alt="">
          @ramiahmed.68
        </a>
      </div>

        <p class="addres">
          Gmail : 
          {{ this.$store.state.Gmail }}
        </p>
    </div>
  </div>
</template>

<script>
import loadingAnimationVue from '@/components/global/loadingAnimation.vue';
export default {
  name: 'HomeView',
  mounted() {
    this.$store.dispatch("GetInfo");
  },
  components : {
    loadingAnimationVue
  }
}
</script>
