<template>
  <NavComponenet />
  <router-view/>
</template>

<script>
import NavComponenet from "./components/global/NavComponenet.vue";
export default {
  name : "app",
  components : {
    NavComponenet
  }
}
</script>

