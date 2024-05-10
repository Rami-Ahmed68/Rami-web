<template>
    <div  class="error-form" :id="`error-form-${this.$store.state.mood}`">
        <div class="header">
            <icon icon="xmark" @click="this.$store.commit('updateErrorStatus')"/>
            <h1> Error </h1>
        </div>
        <h2>
            {{ this.$store.state.errorMessage }}
        </h2>
    </div>
</template>

<script>
export default {
    name : "error-form",
    methods : {
        test() {
            console.log(this.$store.state.errorStatus)
        }
    }
}
</script>
