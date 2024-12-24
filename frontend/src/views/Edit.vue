<template>
    <div class="container mt-5">
    

        <h1>Edit Trainee</h1>

        <div v-if="loading" class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <form v-else @submit.prevent="updateTrainee">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="trainee.name" required />
            </div>
            <div class="mb-3">
                <label for="skill" class="form-label">Skill Level</label>
                <input type="number" class="form-control" id="skill" v-model="trainee.skill" required>
            </div>
            <div class="mb-3">
                <label for="bio" class="form-label">About</label>
                <textarea class="form-control" id="bio" v-model="trainee.bio" required></textarea>
            </div>
            <div class="mb-3">
                <label for="trainingCenter" class="form-label">Training Center</label>
                 <select class="form-control" v-model="trainee.training_center_id" required>
                    <option value="" disabled selected>Select a Training Center</option>
                    <option v-for="center in trainingCenters" :key="center.id" :value="center.id">
                        {{ center.name }}
                    </option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Update Trainee</button>
            <router-link to="/AllTrainees" class="btn btn-secondary">Cancel</router-link>
        </form>
    </div>
</template>

<script>
import api from '@/services/api'; 

export default {
    data() {
        return {
            trainee: {
                name: '',
                skill: '',
                bio: '',
                training_center_id: ''
            },
            trainingCenters: [],
            loading: true 
        };
    },
    created() {
        this.fetchTrainingCenters();
    },
    methods: {
         async fetchTrainingCenters() {
            try {
                const response = await api.getTrainingCenters();
                this.trainingCenters = response.data.data;
            } catch (error) {
                console.error("Error fetching training centers:", error);
            }
        },

        getTraineeDetails() {
            const traineeId = this.$route.params.id; 
            api.getTraineeById(traineeId)
                .then(response => {
                    this.trainee = response.data.data; 
                })
                .catch(error => {
                    console.error("Error fetching trainee details:", error);
                })
                .finally(() => {
                    this.loading = false; 
                });
        },
        updateTrainee() {
            const traineeId = this.$route.params.id; 
            api.updateTrainee(traineeId, this.trainee)
                 .then(() => {
                    alert("Trainee updated successfully.");
                    this.$router.push('/AllTrainees'); 
                })
                .catch(error => {
                    console.error("Error updating trainee:", error);
                    alert("There was an error updating the trainee.");
                });
        }
    },
    mounted() {
        this.getTraineeDetails();
    }
}
</script>

<style scoped>
.container {
    max-width: 600px; 
    margin: auto; 
}

.btn {
    margin-right: 10px; 
}
textarea {
    width: 100%;
    height: 100px;
    resize: none;
}
</style>