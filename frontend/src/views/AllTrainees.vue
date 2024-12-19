<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Currently Available Trainees</h1>

        <div v-if="loading" class="text-center">
            <p>Loading trainees...</p> 
        </div>

        <ul v-else class="list-unstyled">
            <li v-for="trainee in trainees" :key="trainee.id" class="mb-3">
                <div :class="['card', 'border-left', trainee.skill > 70 ? 'border-crimson' : '']">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div class="w-70">
                            <h3 class="card-title">{{ trainee.name }}</h3>
                            <p class="card-text">{{ trainee.training_center.name }}</p>
                        </div>

                        <!-- Buttons -->
                        <div class="btn-group" role="group">
                            <a :href="`/TraineeDetails/${trainee.id}`" class="btn btn-primary">View Details</a>
                            <a :href="`/Edit/${trainee.id}/edit`" class="btn btn-secondary">Edit</a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        
    </div>
</template>

<script>
import api from '@/services/api'; 

export default {
    data() {
        return {
            trainees: [],
            loading: true 
        };
    },
    methods: {
        getTrainees() {
            this.loading = true; 
            api.getTrainees() 
                .then(response => {
                    this.trainees = response.data.data.data; 
                })
                .catch(error => {
                    console.error("Error fetching trainees:", error);
                })
                .finally(() => {
                    this.loading = false; 
                });
        },
    },
    mounted() {
        this.getTrainees();
    }
}
</script>

<style scoped>
.border-left {
    border-left: 5px solid white; 
}

.border-crimson {
    border-left-color: crimson; 
}

.card {
    transition: box-shadow 0.3s; 
}

.card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}
</style>