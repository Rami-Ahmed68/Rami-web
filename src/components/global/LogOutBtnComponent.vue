<template>
    <button @click="this.$store.commit('LogOut')" class="log-out-btn">Log out</button>
</template>

<script>
export default {
    name : "log-out"
}
</script>
