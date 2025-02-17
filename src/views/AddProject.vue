<template>
    <div class="container">
        <CardContainer>
            <h1>Add Project</h1>
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
                    <button type="submit">Add Project</button>
                </div>
            </form>
        </CardContainer>
    </div>
</template>

<script>
import CardContainer from '../components/CardContainer.vue';

export default {
    name: 'AddProject',
    components: {
        CardContainer
    },
    data() {
        return {
            sizes: ['Small', 'Medium', 'Large'],
            selectedSize: 'Small',
            name: '',
            startDate: '',
            endDate: ''
        };
    },
    methods: {
        handleSubmit() {
            const projects = JSON.parse(localStorage.getItem('projects')) || [];

            const project = {
                name: this.name,
                startDate: this.startDate,
                endDate: this.endDate,
                size: this.selectedSize,
                status: 'In Progress'
            };

            
            projects.push(project);
            
            localStorage.setItem('projects', JSON.stringify(projects));
            
            alert('Project successfully added!');

            this.$router.push('/dashboard');
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