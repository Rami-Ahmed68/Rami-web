<template>
    <nav ref="storedMode" :id="`nav-cont-${this.$store.state.mood}`">
        <div class="nav-cont" :id="`nav-${this.mood}`">
            <div class="logo">
                <router-link to="/">
                    <img src="../../assets/logo_light.png" alt="logo" v-if="this.mood == 'darck'">
                    <img src="../../assets/logo_darck.png" alt="logo" v-if="this.mood == 'light'">
                </router-link>
            </div>

            <ul class="list">
                <li>
                    <router-link to="/">
                    home
                    </router-link>
                </li>

                <li>
                    <router-link to="/works">
                        works
                    </router-link>
                </li>

                <li>
                    <router-link to="/skills">
                        skills
                    </router-link>
                </li>
            </ul>

            <div class="mood" @click="changemood" :id="this.mood">
                <icon :icon="this.moodIcon" class="moon"/>
            </div>

            <!-- list box bars icon  -->
            <div class="bars" @click="ChangeboxStatus">
                <icon icon="bars" />
            </div>

            <!-- list box  -->
            <div :class="this.boxStatus" @click="ChangeboxStatus">
                <ul>
                    <li>
                        <router-link to="/">
                        home
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/works">
                            works
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/skills">
                            skills
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    name : "NavComponenet",
    data() {
        return {
            // bars status
            boxStatus : 'close-box',

            moodIcon : "sun",

            // defualt mood color
            mood : this.$store.state.mood,

        }
    },

    mounted() {
        // update mood Icon on load this component
        this.moodIcon = this.mood == "light" ? "moon" : "sun";
    },

    methods : {
        // to open or close the list box
        ChangeboxStatus() {
            this.boxStatus = this.boxStatus == "close-box" ? "open-box" : "close-box"
        },

        // to change the mood in store
        changemood () {
            this.mood = this.mood == "light" ? "darck" : "light";

            // change mood icon
            this.moodIcon = this.mood == "light" ? "moon" : "sun";

            // save the mood in local storage
            window.localStorage.setItem("mood" , this.mood);

            // update the mood in store
            this.$store.commit('changemood');
        },

    }
}
</script>
