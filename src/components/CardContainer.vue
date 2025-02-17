<template>
    <div class="card-container">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'CardContainer'
}
</script>

<style scoped>
.card-container {
    width: 60%;
    height: 70%;
    border: 1px solid black;
    border-radius: 8px;
}
</style>