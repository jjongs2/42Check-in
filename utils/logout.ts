export default function logout(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}