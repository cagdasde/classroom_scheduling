<!-- src/components/Sidebar.vue -->
<template>
    <div class="flex">
      <!-- Sidebar -->
      <aside
        :class="[
          'bg-white shadow-lg transition-transform duration-300 ease-in-out',
          isCollapsed ? '-translate-x-full' : 'translate-x-0',
          'fixed md:relative inset-y-0 left-0 w-64 z-30'
        ]"
      >
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-xl font-bold">Scheduler</h2>
          <button @click="toggleCollapse" class="md:hidden text-gray-500">
            <!-- Hamburger / Close ikonunu biraz daha küçük yaptım -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isCollapsed" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav class="mt-4">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
            :class="$route.path.startsWith(item.path) ? 'bg-gray-100 font-medium' : ''"
          >
            <!-- İkon boyutunu h-4 w-4 yaptık -->
            <component :is="item.icon" class="h-4 w-4 mr-3 text-gray-600" />
            {{ item.label }}
          </router-link>
        </nav>
      </aside>
      <!-- Mobile overlay -->
      <div
        v-if="!isCollapsed"
        @click="toggleCollapse"
        class="fixed inset-0 bg-black opacity-50 md:hidden"
      ></div>
    </div>
  </template>
  
  <script>
  import {
    MenuIcon,
    XMarkIcon,
    BookOpenIcon,
    PlusCircleIcon,
    OfficeBuildingIcon
  } from '@heroicons/vue/24/outline';
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Sidebar',
    components: { MenuIcon, XMarkIcon, BookOpenIcon, PlusCircleIcon, OfficeBuildingIcon },
    data() {
      return {
        isCollapsed: true,
        menuItems: [
          { path: '/courses', label: 'Dersler', icon: BookOpenIcon },
          { path: '/courses/add', label: 'Yeni Ders', icon: PlusCircleIcon },
          { path: '/classrooms', label: 'Sınıflar', icon: OfficeBuildingIcon },
          { path: '/classrooms/add', label: 'Yeni Sınıf', icon: PlusCircleIcon }
        ]
      };
    },
    methods: {
      toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
      }
    }
  };
  </script>
  
  <style scoped>
  aside {
    width: 16rem;
  }
  </style>
  