<template>
    <div class="options">
        <icon icon="ellipsis-vertical" class="options-icon" @click="OpenCloseOptions"/>

    <ul class="optins-cont" :id="this.optiosStatus">
        <li @click="OpenUpdateForm">Update <icon icon="pen-to-square" /></li>
        <li @click="OpenConfirmForm">Delete <icon icon="trash" /></li>
    </ul>
    </div>
</template>

<script>
export default {
    name : "options-name",
    props : ['work'],
    data() {
        return {
            optiosStatus : 'close'
        }
    },
    methods : {

        // to open the update work form and close the Optios cont
        OpenUpdateForm() {
            // open update work form
            this.$store.commit('openUpdateWork');
            // close options cont
            this.OpenCloseOptions()
        },

        OpenCloseOptions() {
            this.optiosStatus = this.optiosStatus == 'close' ? 'open' : 'close';
        },

        OpenConfirmForm() {
            this.$store.commit('OpenConfirmation');

            // close options cont
            this.OpenCloseOptions()
        }
    }
}
</script>
