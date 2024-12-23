<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Currently Available Trainees</h1>

        <!-- Error Handling -->
        <div v-if="error" class="alert alert-danger text-center">
            {{ error }}
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <!-- Trainees List -->
        <template v-else-if="trainees && trainees.length > 0">
            <ul class="list-unstyled">
                <li v-for="trainee in trainees" :key="trainee.id" class="mb-3">
                    <div :class="['card', 'border-left', trainee.skill > 70 ? 'border-crimson' : '']">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h3 class="card-title">{{ trainee.name }}</h3>
                                <p class="card-text">
                                    {{ trainee.training_center?.name || 'No Training Center' }}
                                </p>
                            </div>

                            <div class="btn-group" role="group">
                                <button 
                                    class="btn btn-primary"
                                    @click="viewTraineeDetails(trainee.id)"
                                >
                                    View Details
                                </button>
                                <button 
                                    class="btn btn-secondary"
                                    @click="editTrainee(trainee.id)"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <!-- Pagination -->
            <nav v-if="totalPages > 1" class="mt-4">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <button 
                            class="page-link" 
                            @click="changePage(currentPage - 1)"
                            :disabled="currentPage === 1"
                        >
                            Previous
                        </button>
                    </li>

                    <li 
                        v-for="page in totalPages" 
                        :key="page" 
                        class="page-item" 
                        :class="{ active: currentPage === page }"
                    >
                        <button class="page-link" @click="changePage(page)">
                            {{ page }}
                        </button>
                    </li>

                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <button 
                            class="page-link" 
                            @click="changePage(currentPage + 1)"
                            :disabled="currentPage === totalPages"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </template>

        <!-- No Trainees State -->
        <div v-else class="text-center">
            <p>No trainees found.</p>
        </div>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
    data() {
        return {
            trainees: [],
            loading: true,
            error: null,
            currentPage: 1,
            totalPages: 0,
            totalTrainees: 0
        };
    },
    methods: {
        async fetchTrainees(page = 1) {
            this.loading = true;
            this.error = null;

            try {
                const response = await api.getTrainees({ page });
                const { success, data } = response.data;
                if (!success) {
                    throw new Error('API request was not successful');
                }

                // Extract trainees and pagination details
                const { 
                    data: traineesData, 
                    current_page, 
                    last_page, 
                    total 
                } = data;

                // Set component state
                this.trainees = traineesData;
                this.currentPage = current_page;
                this.totalPages = last_page;
                this.totalTrainees = total;
            } catch (error) {
                console.error('Fetch Trainees Error:', error);
                this.error = error.response?.data?.message 
                    || error.message 
                    || 'Failed to load trainees';
            } finally {
                this.loading = false;
            }
        },
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.fetchTrainees(page);
            }
        },
        viewTraineeDetails(id) {
            this.$router.push(`/TraineeDetails/${id}`);
        },
        editTrainee(id) {
            this.$router.push(`/Edit/${id}/edit`);
        }
    },
    created() {
        this.fetchTrainees();
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
    margin-bottom: 15px;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>