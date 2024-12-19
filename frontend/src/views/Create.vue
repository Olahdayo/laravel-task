<template>
    <div class="container custom-container mt-5">
        <h1 class="mb-4">Create New Trainee</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input type="text" class="form-control" v-model="trainee.name" required />
            </div>
            <div class="mb-3">
                <label for="skillLevel" class="form-label">Skill Level (1-100):</label>
                <input type="number" class="form-control" v-model="trainee.skillLevel" min="1" max="100" required />
            </div>
            <div class="mb-3">
                <label for="bio" class="form-label">Bio:</label>
                <textarea class="form-control" v-model="trainee.bio" required></textarea>
            </div>
            <div class="mb-3">
                <label for="training_center_id" class="form-label">Training Center ID:</label>
                <input type="text" class="form-control" v-model="trainee.training_center_id" required />
            </div>
            <button type="submit" class="btn btn-primary">Create Trainee</button>
        </form>
        <div v-if="message" :class="{'alert': true, 'alert-success': success, 'alert-danger': !success, 'mt-3': true}">
            {{ message }}
        </div>
    </div>
</template>

<script>
import api from '@/services/api'; 

export default {
    data() {
        return {
            trainee: {
                name: '',
                skillLevel: null, 
                bio: '',
                training_center_id: '', 
            },
            message: '',
            success: false
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await this.createTrainee(this.trainee);
                if (response && response.data) {
                    this.message = `Trainee created successfully: ${response.data.name}`;
                    this.success = true;
                } else {
                    this.message = 'Trainee created, but no response data received.';
                    this.success = false;
                }
                this.resetForm();
            } catch (error) {
                if (error.response && error.response.data) {
                    this.message = `Error creating trainee: ${error.response.data.message}`;
                } else {
                    this.message = `Error creating trainee: ${error.message}`;
                }
                this.success = false;
            }
        },
        createTrainee(data) {
            return api.createTrainee('/trainees', data);
        },
        resetForm() {
            this.trainee.name = '';
            this.trainee.skillLevel = null; 
            this.trainee.bio = '';
            this.trainee.training_center_id = ''; 
        }
    }
};
</script>

<style scoped>
.custom-container {
    max-width: 600px; 
    margin: auto; 
}
.success {
    color: green;
}
.error {
    color: red;
}
</style>