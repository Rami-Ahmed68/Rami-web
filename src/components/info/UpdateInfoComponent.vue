<template>
        <div class="info-inputs-cont">
                <div class="header">
                    <icon icon="xmark" class="close-icon" @click="this.$store.commit('OpenInfoForm')"/>
                    <h1>Edait Info</h1>
                    <!-- loading animation  -->
                    <loadingAnimationVue v-if="this.$store.state.DataLoaded"/>
                    <!-- loading animation  -->
                </div>

                <div class="info-cont">
                    <div class="work" id="info">
                        <label for="work">Work <span v-if="this.$store.state.enableWork">cante ediat</span></label>
                        <textarea type="text" id="work" placeholder="work" v-model="this.$store.state.info.work" :class="this.enable" :readonly="this.$store.state.enableWork"></textarea>
                        <icon icon="pen-to-square" class="edit-icon" title="Edit Work Info" @click="this.$store.commit('EnableWork')"/>
                    </div>

                    <div class="love" id="info">
                        <label for="love">Love <span v-if="this.$store.state.enableLove">cante ediat</span></label>
                        <textarea type="text" id="love" placeholder="love" v-model="this.$store.state.info.love" :readonly="this.$store.state.enableLove"></textarea>
                        <icon icon="pen-to-square" class="edit-icon" title="Edit Love Info" @click="this.$store.commit('EnableLove')"/>
                    </div>

                    <div class="bio" id="info">
                        <label for="bio">Bio <span v-if="this.$store.state.enableBio">cante ediat</span></label>
                        <textarea type="text" id="bio" placeholder="bio" v-model="this.$store.state.info.bio" :readonly="this.$store.state.enableBio"></textarea>
                        <icon icon="pen-to-square" class="edit-icon" title="Edit Bio Info" @click="this.$store.commit('EnableBio')"/>
                    </div>

                    <button @click="updateInfo" v-if="!this.$store.state.enableWork || !this.$store.state.enableLove || !this.$store.state.enableBio">Update Info</button>
                </div>
        </div>
</template>


<script>
import loadingAnimationVue from '@/components/global/loadingAnimation.vue';
import axios from 'axios';
export default {
    name : "update-info-component",
        data() {
        return {
            work : this.$store.state.info.work,
            love : "",
            bio : [],
            enable : "enable",
            admin : JSON.parse(window.localStorage.getItem("adminInfo"))
        }
    },
    components : {
        loadingAnimationVue
    },
    mounted() {
        this.work = this.$store.state.info.work;
    },
    methods : {
        async updateInfo() {
            // to start the loadin animation
            this.$store.state.DataLoaded = true;

            // body data
            const data = {
                adminId: this.admin.admin._id,
                infoId: this.$store.state.info._id,
                work: this.$store.state.info.work,
                love: this.$store.state.info.love,
                bio: [this.$store.state.info.bio],
            };

            // headers
            const headers = {
                Authorization : `Bearer ${this.admin.token}`,
            };

            try {
                await axios.put(this.$store.state.UpdateInfoApi ,
                data,
                {headers}
                ).then(() => {

                    // to stope the loadin animation
                    this.$store.state.DataLoaded = false;

                    // to close the Info form
                    this.$store.commit('OpenInfoForm');

                    // to hidd the button
                    this.$store.state.enableWork = true;
                    this.$store.state.enableLove = true;
                    this.$store.state.enableBio = true;

                }).catch((error) => {
                    // to stope the loadin animation
                    this.$store.state.DataLoaded = false;

                    // update error message in store to open error form 
                    this.$store.state.errorMessage = error.response.data.message

                    // to close the Info form
                    this.$store.commit('OpenInfoForm');

                    // to hidd the button
                    this.$store.state.enableWork = true;
                    this.$store.state.enableLove = true;
                    this.$store.state.enableBio = true;
                })
            } catch (error) {
                // update error message in store to open error form 
                this.$store.state.errorMessage = error.response.data.message

                // to stope the loadin animation
                this.$store.state.DataLoaded = false;

                // to close the Info form
                this.$store.commit('OpenInfoForm');

                    // to hidd the button
                    this.$store.state.enableWork = true;
                    this.$store.state.enableLove = true;
                    this.$store.state.enableBio = true;
            }
        }
    },
}
</script>
