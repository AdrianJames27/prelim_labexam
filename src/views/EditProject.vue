<template>
    <div class="container">
        <CardContainer>
            <h1>Edit Project</h1>
            <form @submit.prevent="handleSubmit">
                <div>
                    <label for="name">Project Name</label>
                    <input type="text" id="name" v-model="name" required>
                </div>
                <div>
                    <div>
                        <label for="startDate">Start Date</label>
                        <input type="date" id="startDate" v-model="startDate" required>
                    </div>
                    <div>
                        <label for="endDate">End Date</label>
                        <input type="date" id="endDate" v-model="endDate" required>
                    </div>
                </div>
                <div>
                    <label for="size">Size</label>
                    <select id="size" v-model="selectedSize">
                        <option v-for="(size, index) in sizes" :key="index" :value="size">
                            {{ size }}
                        </option>
                    </select>
                </div>
                <div>
                    <input type="radio" name="status" id="inProgress" value="In Progress" v-model="status" required>
                    <label for="inProgress">In Progress</label>
                    <input type="radio" name="status" id="done" value="Done" v-model="status" required>
                    <label for="done">Done</label>
                </div>
                <div>
                    <button type="submit">Edit Project</button>
                </div>
            </form>
        </CardContainer>
    </div>
</template>

<script>
import CardContainer from '../components/CardContainer.vue';

export default {
    name: 'EditProject',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        CardContainer
    },
    data() {
        return {
            sizes: ['Small', 'Medium', 'Large'],
            selectedSize: 'small',
            name: '',
            startDate: '',
            endDate: '',
            status: '',
            projectId: 0,
        };
    },
    methods: {
        handleSubmit() {
            const projects = JSON.parse(localStorage.getItem('projects')) || [];
            const project = projects[this.projectId];

            const editedProject = {
                name: this.name,
                startDate: this.startDate,
                endDate: this.endDate,
                size: this.selectedSize,
                status: this.status
            };

            if (project) {
                projects.splice(this.projectId, 1, {...editedProject});

                localStorage.setItem('projects', JSON.stringify(projects));

                alert('Successfully edited project!');

                this.$router.push('/dashboard');
            }
        }
    },
    mounted() {
        this.projectId = parseInt(this.id);
        const projects = JSON.parse(localStorage.getItem('projects'));
        const project = projects[this.projectId];

        this.name = project.name;
        this.startDate = project.startDate;
        this.endDate = project.endDate;
        this.selectedSize = project.size;
        this.status = project.status;
    },
    beforeRouteEnter(to, from, next) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (to.name === 'edit-project' && user.role !== 'admin') {
            alert('Only admins are allowed in this route!');

            next(from.path);
        } else {
            next();
        }
    }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>