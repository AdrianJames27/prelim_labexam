<template>
    <div class="container">
        <CardContainer>
            <h2>Register</h2>
            <form @submit.prevent="handleSubmit">
                <div>
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="username" required>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <div>
                    <label for="roles">Select Role</label>
                    <select id="roles" v-model="selectedRole">
                        <option v-for="(role, index) in roles" :key="index" :value="role">
                            {{ role }}
                        </option>
                    </select>
                </div>
                <div class="form-buttons">
                    <button type="submit">Register</button>
                </div>
            </form>
            <div class="existing-account">
                <p>Already have an account? <RouterLink to="/login">Login Account</RouterLink></p>
            </div>
        </CardContainer>
    </div>
</template>

<script>
import CardContainer from '../components/CardContainer.vue';

export default {
    name: 'Register',
    components: {
        CardContainer
    },
    data() {
        return {
            roles: ['admin', 'employee'],
            selectedRole: 'admin',
            username: '',
            password: ''
        };
    },
    methods: {
        handleSubmit() {
            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = {
                username: this.username,
                password: this.password,
                role: this.selectedRole
            };

            alert('User is successfully registered!');

            users.push(user);

            localStorage.setItem('users', JSON.stringify(users));

            this.$router.push('/login');
        }
    },
    beforeRouteEnter(to, from, next) {
        const isAuthenticated = JSON.parse(localStorage.getItem('user')) || null;

        if (to.name === 'register' && isAuthenticated) {
            next('/dashboard');
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