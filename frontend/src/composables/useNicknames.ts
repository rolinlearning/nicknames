import { ref, computed, watch } from "vue";
import { nicknameApi } from "@/services/nicknameApi";
import type { Nickname, CreateNicknameRequest } from "@/types/nickname";

export function useNicknames() {
  const nicknames = ref<Nickname[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const searchQuery = ref("");
  const currentPage = ref(1);
  const totalPages = ref(0);
  const totalItems = ref(0);
  const itemsPerPage = ref(10);

  // Computed
  const hasNicknames = computed(() => nicknames.value.length > 0);
  const hasNextPage = computed(() => currentPage.value < totalPages.value);
  const hasPrevPage = computed(() => currentPage.value > 1);

  // Metodos
  const fetchNicknames = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await nicknameApi.getNicknames({
        page: currentPage.value,
        limit: itemsPerPage.value,
        search: searchQuery.value.trim() || undefined,
      });

      nicknames.value = response.data;
      totalPages.value = response.pagination.pages;
      totalItems.value = response.pagination.total;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Error al cargar nicknames";
      nicknames.value = [];
    } finally {
      loading.value = false;
    }
  };

  const createNickname = async (
    data: CreateNicknameRequest,
  ): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      await nicknameApi.createNickname(data);
      await fetchNicknames(); // Recargar lista
      return true;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Error al crear nickname";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteNickname = async (id: number): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      await nicknameApi.deleteNickname(id);
      await fetchNicknames(); // recargar lista
      return true;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Error al eliminar nickname";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const toggleActive = async (nickname: Nickname): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      await nicknameApi.updateNickname(nickname.id, {
        isActive: !nickname.isActive,
      });
      await fetchNicknames(); // Recargar lista
      return true;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Error al actualizar nicknames";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const nextPage = () => goToPage(currentPage.value + 1);
  const prevPage = () => goToPage(currentPage.value - 1);

  const search = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1; // Reset a primera pagination
  };

  const clearError = () => {
    error.value = null;
  };

  // Watchers
  watch([currentPage, searchQuery], () => {
    fetchNicknames();
  });

  return {
    // state
    nicknames,
    loading,
    error,
    searchQuery,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,

    // Computed
    hasNicknames,
    hasNextPage,
    hasPrevPage,

    // Methods
    fetchNicknames,
    createNickname,
    deleteNickname,
    toggleActive,
    goToPage,
    nextPage,
    prevPage,
    search,
    clearError,
  };
}
