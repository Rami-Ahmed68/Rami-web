import { createStore } from "vuex";
import axios from "axios";

export default createStore ({
    state : {
        name : "Rami Ahmed",
        message1 : "Hi, i'm Full-Stack Developer from syria",
        message2 : "Full-Stack (web , mobile)",
        instagram : "https://www.instagram.com/ramiahmed.68/#",
        linkedin : "https://www.linkedin.com/in/rami-ahmed-35233a245?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        discord : "https://discordapp.com/users/1046903290702606346",
        github : "https://github.com/Rami-Ahmed68",
        codewars : "https://www.codewars.com/users/ramiahmed.68",
        Gmail : "ramiahmet68@gmail.com",
        mood : window.localStorage.getItem("mood") || 'darck',
        adminInfo : JSON.parse(window.localStorage.getItem("adminInfo")),
        enableWork : true,
        enableLove : true,
        enableBio : true,
        DataLoaded : false,
        works : "",
        skills : "",
        workId : "",

        LogInApi : "https://rami-gujz.onrender.com/admin/login",
        UpdateAccountApi : "https://rami-gujz.onrender.com/admin/up",
        GetInfoApi : "https://rami-gujz.onrender.com/info/get",
        UpdateInfoApi : "https://rami-gujz.onrender.com/info/up",

        CreateWorkAPi : "https://rami-gujz.onrender.com/work/create",
        GetWorskAPI : "https://rami-gujz.onrender.com/work/get",
        UpdateWorkApi : "https://rami-gujz.onrender.com/work/up",
        DeleteWorkApi : "https://rami-gujz.onrender.com/work/delete",
        GetWorkApI : "https://rami-gujz.onrender.com/work/getone",

        GetSkillsApi : "https://rami-gujz.onrender.com/skill/get",
        UpdateSkillsApi : "https://rami-gujz.onrender.com/skill/up",
        DeleteSkillAPI : "https://rami-gujz.onrender.com/skill/delete",
        CreateSkillAPI : "https://rami-gujz.onrender.com/skill/create",

        info : "",
        errorMessage : "",
        createWork : false,
        updateWork : false,
        updateInfo : false,
        workData : "",
        skillData : "",
        optiosStatus : 'close',
        confirmation : false,
        updateSkill : false,
        deleteSkillForm : false,
        createSkillForm : false,
    },
    getters : {},
    mutations : {
        // update the mood 
        changemood(state) {
            state.mood = window.localStorage.getItem("mood");
        },

        // close error form
        updateErrorStatus(state) {
            state.errorMessage = "";
        },

        // enable edait work
        EnableWork(state) {
            state.enableWork = state.enableWork == false ? true : false;
        },

        // enable edait love
        EnableLove(state) {
            state.enableLove = state.enableLove == false ? true : false;
        },

        // enable edait bio
        EnableBio(state) {
            state.enableBio = state.enableBio == false ? true : false;
        },

        OpenCreatingWorkForm(state) {
            state.createWork = state.createWork == true ? false : true;
        },

        openUpdateWork(state) {
            state.updateWork = state.updateWork == true ? false : true;
        },

        // open edait Info form
        OpenInfoForm(state) {
            state.updateInfo = state.updateInfo == true ? false : true;
        },

        OpenCloseOptions(state) {
            state.optiosStatus = state.optiosStatus == 'close' ? 'open' : 'close';
        },

        OpenConfirmation(state) {
            state.confirmation = state.confirmation == true ? false : true;
        },

        OpenUpdateSkillForm(state) {
            state.updateSkill = state.updateSkill == true ? false : true;
        },

        OpenDeleteSkillForm(state) {
            state.deleteSkillForm = state.deleteSkillForm == true ? false : true;
        },

        OpenCreateSkillForm(state) {
            state.createSkillForm = state.createSkillForm == true ? false : true;
        },

        // log out admin
        LogOut() {
            window.localStorage.removeItem("adminInfo");
            window.location.reload()
        }

    },
    actions : {
        async GetInfo() {
            await axios.get(this.state.GetInfoApi)
            .then((response) => {
                this.state.info = response.data.Info[0];
            }).catch((error) => {
                this.state.errorMessage = error.response.data.message;
            })
        },

        async GetWorks() {
            await axios.get(this.state.GetWorskAPI)
            .then((response) => {
                this.state.works = response.data.works;
            }).catch((error) => {
                this.state.errorMessage = error.response.data.message;
            })
        },

        async GetSkills() {
            axios.get(this.state.GetSkillsApi)
            .then((response) => {
                // set the geted skills to the skills array in state
                this.state.skills = response.data.skills;
            }).catch((error) => {
                // to open the error from
                this.state.errorMessage = error.response.data.message;
            })
        },

        async GetWork() {
            await axios.get(`${this.state.GetWorkApI}?workId=${this.state.workId}`)
            .then((response) => {
                this.state.workData = response.data.work;
                console.log(this.state.workData)
            }).catch((error) => {
                this.state.errorMessage = error.response.data.message;
            })
        }
    },
    modules : {}
});