<template>
    <div v-if="projects.length > 0">
        <div v-for="(project, index) in projects" :key="index">
            <span>Project Name: {{ project.name }} Status: {{ project.status }}</span>
            <p>Start Date: {{ project.startDate }} | End Date: {{ project.endDate }}</p>
            <button @click="handleEditProject(index)">Edit Project</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectList',
    props: {
        projects: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>