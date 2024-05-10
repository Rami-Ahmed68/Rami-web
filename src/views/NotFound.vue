<template>
    <div :class="`not-found-${this.$store.state.mood}`">
            <div class="cont">
                <!-- <icon icon="face-sad-tear" /> -->
                <img src="../assets/logo_light.png" alt="" v-if="this.$store.state.mood == 'darck'">
                <img src="../assets/logo_darck.png" alt="" v-if="this.$store.state.mood == 'light'">
                <h1>Not Found</h1>
                <h3>The page you're looking for was not found . </h3>
                <a href="/">Go to home</a>
            </div>
    </div>
</template>

<script>
export default {
    name : "not-found",
}
</script>
