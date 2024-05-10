<template>
    <div class="create-skill-cont">
        <div class="create-skill" @click="this.$store.commit('OpenCreateSkillForm')">
            <icon icon="plus" />
            Create Skill
        </div>
    </div>
</template>

<script>
export default {
    name : "create-skill"
}
</script>
