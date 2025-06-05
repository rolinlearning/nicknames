<!-- src/components/NicknameManager.vue -->
<template>
  <div class="min-h-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
    <!-- Main Container with proper spacing from header -->
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      
      <!-- Hero Section with better typography -->
      <div class="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
        <div class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/25">
          <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h1 class="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Gestión de 
          <span class="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Nicknames</span>
        </h1>
        <p class="text-lg leading-8 text-gray-300 sm:text-xl">
          Administra y registra nicknames únicos de forma sencilla y eficiente con nuestra plataforma moderna
        </p>
      </div>

      <!-- Main Content Grid with better responsive layout -->
      <div class="grid gap-8 lg:grid-cols-12 lg:gap-12">
        
        <!-- Left Sidebar - Form and Controls -->
        <div class="space-y-8 lg:col-span-4">
          
          <!-- Create Nickname Form -->
          <div class="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div class="border-b border-white/10 bg-white/5 px-6 py-4">
              <div class="flex items-center space-x-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 ring-1 ring-blue-500/30">
                  <svg class="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h2 class="text-lg font-semibold text-white">Nuevo Nickname</h2>
              </div>
            </div>
            
            <div class="p-6">
              <form @submit.prevent="handleCreateNickname" class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-3">
                    Nombre de usuario
                  </label>
                  <div class="relative">
                    <input
                      v-model="newNickname"
                      type="text"
                      placeholder="Ingresa un nickname único..."
                      class="block w-full rounded-xl border-0 bg-white/5 px-4 py-3.5 text-white placeholder:text-gray-400 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-blue-500 transition-all duration-200 sm:text-sm sm:leading-6"
                      :disabled="loading"
                      maxlength="20"
                    >
                    <div class="absolute -bottom-6 right-0 text-xs text-gray-500">
                      {{ newNickname.length }}/20
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  :disabled="!newNickname.trim() || loading"
                  class="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:from-gray-700 disabled:to-gray-700 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  <span class="relative flex items-center justify-center space-x-2">
                    <svg v-if="loading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{{ loading ? 'Guardando...' : 'Registrar Nickname' }}</span>
                  </span>
                </button>
              </form>
            </div>
          </div>

          <!-- Search Box -->
          <div class="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div class="border-b border-white/10 bg-white/5 px-6 py-4">
              <div class="flex items-center space-x-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-500/30">
                  <svg class="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h2 class="text-lg font-semibold text-white">Buscar</h2>
              </div>
            </div>
            
            <div class="p-6">
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  :value="searchQuery"
                  @input="handleSearch"
                  type="text"
                  placeholder="Buscar nicknames..."
                  class="block w-full rounded-xl border-0 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-400 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-emerald-500 transition-all duration-200 sm:text-sm sm:leading-6"
                >
              </div>
            </div>
          </div>

          <!-- Stats Card -->
          <div class="overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <svg class="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <span>Estadísticas</span>
              </h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between py-2">
                  <span class="text-sm font-medium text-gray-300">Total de nicknames</span>
                  <span class="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-sm font-semibold text-blue-200 ring-1 ring-blue-500/30">
                    {{ totalItems }}
                  </span>
                </div>
                <div class="flex items-center justify-between py-2">
                  <span class="text-sm font-medium text-gray-300">Página actual</span>
                  <span class="inline-flex items-center rounded-full bg-purple-500/20 px-3 py-1 text-sm font-semibold text-purple-200 ring-1 ring-purple-500/30">
                    {{ currentPage }} de {{ totalPages }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-8">
          
          <!-- Error Alert with better styling -->
          <div v-if="error" class="mb-8 rounded-xl bg-red-500/10 border border-red-500/20 p-4 backdrop-blur-xl">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-red-200">{{ error }}</p>
              </div>
              <button @click="clearError" class="flex-shrink-0 text-red-300 hover:text-red-100 transition-colors">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading && !hasNicknames" class="flex min-h-96 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div class="text-center">
              <div class="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-500 mb-6"></div>
              <p class="text-lg font-medium text-gray-300">Cargando nicknames...</p>
            </div>
          </div>

          <!-- Nicknames List -->
          <div v-else-if="hasNicknames" class="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <!-- Header -->
            <div class="border-b border-white/10 bg-white/5 px-6 py-5">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-white">Lista de Nicknames</h2>
                  <p class="mt-1 text-sm text-gray-400">
                    {{ totalItems }} {{ totalItems === 1 ? 'nickname registrado' : 'nicknames registrados' }}
                  </p>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="h-2 w-2 rounded-full bg-green-500"></div>
                  <span class="text-sm font-medium text-gray-300">En línea</span>
                </div>
              </div>
            </div>
            
            <!-- List Items -->
            <div class="divide-y divide-white/10">
              <div
                v-for="nickname in nicknames"
                :key="nickname.id"
                class="group relative px-6 py-5 transition-all duration-200 hover:bg-white/5"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <!-- Status Indicator -->
                    <div class="relative flex-shrink-0">
                      <div :class="[
                        'h-4 w-4 rounded-full shadow-lg transition-all duration-200',
                        nickname.isActive 
                          ? 'bg-green-500 shadow-green-500/50 ring-2 ring-green-500/20' 
                          : 'bg-red-500 shadow-red-500/50 ring-2 ring-red-500/20'
                      ]"></div>
                      <div v-if="nickname.isActive" class="absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                    </div>
                    
                    <!-- Nickname Info -->
                    <div class="min-w-0 flex-1">
                      <h3 class="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                        {{ nickname.nickname }}
                      </h3>
                      <p class="text-sm text-gray-400">
                        Registrado el {{ formatDate(nickname.createdAt) }}
                      </p>
                    </div>
                  </div>
                  
                  <!-- Action Buttons -->
                  <div class="flex items-center space-x-3">
                    <button
                      @click="toggleActive(nickname)"
                      :class="[
                        'inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-200 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                        nickname.isActive 
                          ? 'bg-amber-500 text-white hover:bg-amber-600 focus-visible:outline-amber-600 shadow-amber-500/30' 
                          : 'bg-green-500 text-white hover:bg-green-600 focus-visible:outline-green-600 shadow-green-500/30'
                      ]"
                    >
                      {{ nickname.isActive ? 'Desactivar' : 'Activar' }}
                    </button>
                    <button
                      @click="handleDeleteNickname(nickname.id)"
                      class="inline-flex items-center rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all duration-200 hover:bg-red-600 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="border-t border-white/10 bg-white/5 px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 text-sm text-gray-400">
                  <span>Página</span>
                  <span class="font-semibold text-white">{{ currentPage }}</span>
                  <span>de</span>
                  <span class="font-semibold text-white">{{ totalPages }}</span>
                  <span class="text-gray-500">•</span>
                  <span class="font-semibold text-white">{{ totalItems }}</span>
                  <span>total</span>
                </div>
                <div class="flex space-x-2">
                  <button
                    @click="prevPage"
                    :disabled="!hasPrevPage"
                    class="inline-flex items-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white/10"
                  >
                    <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Anterior
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="!hasNextPage"
                    class="inline-flex items-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white/10"
                  >
                    Siguiente
                    <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="flex min-h-96 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div class="mx-auto max-w-md text-center">
              <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-500/20">
                <svg class="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6"></path>
                </svg>
              </div>
              <h3 class="mb-3 text-2xl font-semibold text-white">
                {{ searchQuery ? 'Sin resultados' : 'No hay nicknames' }}
              </h3>
              <p class="text-lg leading-7 text-gray-400">
                {{ searchQuery 
                  ? 'No se encontraron nicknames que coincidan con tu búsqueda' 
                  : 'Comienza registrando tu primer nickname usando el formulario lateral' 
                }}
              </p>
              <div v-if="searchQuery" class="mt-6">
                <button
                  @click="search('')"
                  class="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Ver todos los nicknames
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNicknames } from '@/composables/useNicknames';
import type { Nickname } from '@/types/nickname';

const {
  nicknames,
  loading,
  error,
  searchQuery,
  currentPage,
  totalPages,
  totalItems,
  hasNicknames,
  hasNextPage,
  hasPrevPage,
  fetchNicknames,
  createNickname,
  deleteNickname,
  toggleActive,
  nextPage,
  prevPage,
  search,
  clearError
} = useNicknames();

const newNickname = ref('');

const handleCreateNickname = async () => {
  if (!newNickname.value.trim()) return;
  
  const success = await createNickname({ nickname: newNickname.value.trim() });
  if (success) {
    newNickname.value = '';
  }
};

const handleDeleteNickname = async (id: number) => {
  if (confirm('¿Estás seguro de que quieres eliminar este nickname?')) {
    await deleteNickname(id);
  }
};

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  search(target.value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(() => {
  fetchNicknames();
});
</script>