import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllTrainees from '@/views/AllTrainees.vue'
import Create from '@/views/Create.vue'
import Edit from '@/views/Edit.vue'
import TraineeDetails from '@/views/TraineeDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/AllTrainees",
      name: "AllTrainees",
      component: AllTrainees,
    },
    {
      path: "/Create",
      name: "Create",
      component: Create,
    },
    {
      path: "/Edit/:id/edit",
      name: "Edit",
      component: Edit,
    },
    {
      path: "/TraineeDetails/:id",
      name: "TraineeDetails",
      component: TraineeDetails,
    },
  ],
});

export default router
