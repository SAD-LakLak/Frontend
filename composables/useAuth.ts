import { useRouter } from 'vue-router';

export function useAuth() {
  const router = useRouter();

  const checkAuth = () => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const isLoggedIn = !!localStorage.getItem('access');
      if (!isLoggedIn) {
        router.push('/signIn');
      }
    } else {
      console.warn('localStorage is not available. Ensure this code runs in a browser environment.');
    }
  };

  return { checkAuth };
}
