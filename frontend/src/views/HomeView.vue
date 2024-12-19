<template>
  <div class="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
    <h2 class="display-4">Trainee Network</h2>
    <h3 class="mb-4">Welcome to the Trainee Network</h3>
    <p class="lead">Click the button below to view the list of trainees.</p>
    <a href="/AllTrainees" class="btn btn-primary btn-lg mt-4">Find Trainees</a>
  </div>
</template>

<script>
import AllTrainees from './AllTrainees.vue'
export default {
  components: { AllTrainees },
}
</script>

<style scoped>

</style>