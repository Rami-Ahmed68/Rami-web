<template>
    <div class="Info-component">
        <h1>Your Info</h1>
        <icon icon="pen-to-square" title="Click To Edait Your Info" @click="this.$store.commit('OpenInfoForm')"/>
        <h3>Work</h3>
        <div class="work">{{ this.$store.state.info.work }}</div>
        <h3>Love</h3>
        <div class="love">{{ this.$store.state.info.love }}</div>
        <h3>Bio</h3>
        <div class="bio">{{ this.$store.state.info.bio[0] }}</div>
    </div>
</template>

<script>


export default {
    name : "info-component",
}
</script>
