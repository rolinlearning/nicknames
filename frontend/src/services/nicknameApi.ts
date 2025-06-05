//src/services/nicknameApi.ts
import type {
  Nickname, CreateNicknameRequest, UpdateNicknameRequest, PaginatedResponse
} from '@/types/nickname';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class NicknameApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    // Handle 204 No Content responses (like DELETE operations)
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  async getNicknames(params: {
    page?: number;
    limit?: number;
    search?: string;
  } = {}): Promise<PaginatedResponse<Nickname>> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.search) searchParams.set('search', params.search);

    const query = searchParams.toString();
    return this.request<PaginatedResponse<Nickname>>(
      `/nicknames${query ? `?${query}` : ''}`
    );
  }

  async createNickname(data: CreateNicknameRequest): Promise<Nickname> {
    return this.request<Nickname>('/nicknames', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateNickname(id: number, data: UpdateNicknameRequest): Promise<Nickname> {
    return this.request<Nickname>(`/nicknames/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteNickname(id: number): Promise<void> {
    return this.request<void>(`/nicknames/${id}`, {
      method: 'DELETE',
    });
  }
}

export const nicknameApi = new NicknameApiService();