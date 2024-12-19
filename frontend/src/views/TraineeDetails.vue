<template>
    <div class="container mt-5">
        
        <div v-if="trainee" class="card">
            <div class="card-body">
                <h1 class="card-title">{{ trainee.name }}'s Profile</h1>
                <p class="card-text"><strong>Skill Level:</strong> {{ trainee.skill }}</p>
                <p class="card-text"><strong>Id:</strong> {{ trainee.id }}</p>
                <p class="card-text"><strong>About:</strong> {{ trainee.bio }}</p>
                <h4>Training Center Information</h4>
                <p class="card-text"><strong>Training Center Name:</strong> {{ trainee.training_center.name }}</p>
                <p class="card-text"><strong>About Training Center:</strong> {{ trainee.training_center.description }}</p>
                <router-link :to="`/Edit/${trainee.id}/edit`" class="btn btn-secondary">Edit</router-link>
                <router-link to="/AllTrainees" class="btn btn-primary">Back to Trainees</router-link>
                <button @click="deleteTrainee(trainee.id)" class="btn btn-danger">Delete</button>
            </div>
        </div>

        <div v-else>
            <p>Loading trainee details...</p>
        </div>
    </div>
</template>

<script>
import api from '@/services/api'; 

export default {
    data() {
        return {
            trainee: null
        };
    },
    methods: {
        getTraineeDetails() {
            const traineeId = this.$route.params.id; 
            api.getTraineeById(traineeId)
                .then(response => {
                    this.trainee = response.data.data; 
                })
                .catch(error => {
                    console.error("Error fetching trainee details:", error);
                });
        },
        deleteTrainee(id) {
              if (confirm("Are you sure you want to delete this trainee?")) {
                api.deleteTrainee(id)
                    .then(() => {
                        alert("Trainee deleted successfully.");
                        this.$router.push('/AllTrainees'); 
                    })
                    .catch(error => {
                        console.error("Error deleting trainee:", error);
                        alert("There was an error deleting the trainee.");
                    });
            }
        }
    },
    mounted() {
        this.getTraineeDetails();
    }
}
</script>

<style scoped>
.card {
    transition: box-shadow 0.3s; 
}

.card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}
</style>