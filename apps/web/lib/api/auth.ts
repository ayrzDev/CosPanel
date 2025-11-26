import apiClient from '../api-client';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
  accessToken: string;
}

export const authApi = {
  login: async (dto: LoginDto): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/login', dto);
    
    // Store token in both localStorage and cookie
    if (typeof window !== 'undefined' && data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      // Set cookie for middleware
      document.cookie = `accessToken=${data.accessToken};path=/;max-age=${7 * 24 * 60 * 60};SameSite=Lax`;
    }
    
    return data;
  },

  register: async (dto: RegisterDto): Promise<any> => {
    const { data } = await apiClient.post('/auth/register', dto);
    return data;
  },

  getProfile: async (): Promise<any> => {
    const { data } = await apiClient.get('/auth/profile');
    return data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      // Delete cookie
      document.cookie = 'accessToken=;path=/;max-age=0';
      // Get current locale from pathname
      const locale = window.location.pathname.split('/')[1] || 'tr';
      window.location.href = `/${locale}/login`;
    }
  },
};
