<template>
    <div class="container">
        <div class="home-container">
            <nav>
                <div class="div-left">
                    <p>Welcome, {{ user.username }}!</p>
                </div>
                <div class="div-right">
                    <button @click="logoutUser">Logout</button>
                </div>
            </nav>
            <div class="content-page">
                <RouterLink to="project/add">Add Project</RouterLink>
                <div class="list-project-container">
                    <h1>Project List</h1>
                    <div v-if="projects.length > 0">
                        <div v-for="(project, index) in projects" :key="index" class="project-card">
                            <p>Project Name: {{ project.name }}</p>
                            <p>Status: {{ project.status }}</p>
                            <p>Start Date: {{ project.startDate }} | End Date: {{ project.endDate }}</p>
                            <button v-if="project.status !== 'Done'" @click="handleEditProject(index)">Edit Project</button>
                        </div>
                    </div>
                    <div v-else>No project/s yet.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            user: {},
            projects: []
        };
    },
    methods: {
        logoutUser() {
            const response = confirm('Are you sure to logout?');

            if (response) {
                alert('Logged out successfully!');

                localStorage.removeItem('user');

                this.$router.push('/login');
            }
        },
        handleEditProject(index) {
            this.$router.push(`/project/edit/${index}`);
        }
    },
    beforeMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        const projects = JSON.parse(localStorage.getItem('projects')) || [];

        if (user) {
            this.user = user;
            this.projects = projects;
        }
    }
}
</script>

<style scoped>
nav {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #8d8d8d;
}

.div-left, .div-right {
    width: 50%;
    padding: 0 2rem;
    display: flex;
    align-items: center;
}

.div-left {
    justify-content: flex-start;
}

.div-right {
    justify-content: flex-end;
}

.div-left p {
    font-size: large;
    font-weight: bold;
}

.div-right button {
    height: 1.5rem;
    margin: 10px;
    padding: 0 1.5rem;
}

.project-card {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
}
</style>