export interface Nickname {
  id: number;
  nickname: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNicknameRequest {
  nickname: string;
}

export interface UpdateNicknameRequest {
  nickname?: string;
  isActive?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  error: string;
  details?: Array<{
    code: string;
    message: string;
    path: string[];
  }>;
}
