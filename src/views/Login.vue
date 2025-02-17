<template>
    <div class="container">
        <CardContainer>
            <h2>Login</h2>
            <form @submit.prevent="handleSubmit">
                <div>
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="username" required>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <div class="form-buttons">
                    <button type="submit">Login</button>
                </div>
            </form>
            <div class="no-account">
                <p>Don't have an account yet? <RouterLink to="/register">Register Account</RouterLink></p>
            </div>
        </CardContainer>
    </div>
</template>

<script>
import CardContainer from '../components/CardContainer.vue';

export default {
    name: 'Login',
    components: {
        CardContainer
    },
    data() {
        return {
            username: '',
            password: ''
        };
    },
    computed: {

    },
    methods: {
        handleSubmit() {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => this.username === user.username && this.password === user.password);

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                
                alert('Login successful!');

                this.$router.push('/dashboard');
            } else {
                alert('Invalid account credentials');
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        const isAuthenticated = JSON.parse(localStorage.getItem('user')) || null;

        if (to.name === 'login' && isAuthenticated) {
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