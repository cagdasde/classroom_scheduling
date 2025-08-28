import { createRouter, createWebHistory } from 'vue-router';
import CoursesPage from '../components/CoursesPage.vue';
import AddCoursePage from '../components/AddCoursePage.vue';  // AddCoursePage'i doğru eklediğinden emin ol!
import AddClassroomPage from '@/components/AddClassroomPage.vue';
import ClassroomsPage from '@/components/ClassroomsPage.vue';
import SchedulePage from '@/components/SchedulePage.vue';
import AddSchedulePage from '@/components/AddSchedulePage.vue';

const routes = [
  { path: '/courses', component: CoursesPage },
  { path: '/courses/add', component: AddCoursePage},
  { path: '/schedule', component: SchedulePage },
  { path: '/schedules/add', component: AddSchedulePage},
  { path: '/classrooms', component: ClassroomsPage },
  { path: '/classrooms/add', component: AddClassroomPage },
  { path: '/', redirect: '/courses' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
