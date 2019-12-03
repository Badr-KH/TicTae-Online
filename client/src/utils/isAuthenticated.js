export default async function isAuthenticated() {
  const auth = await fetch("/profile");
  const result = await auth.json();
  return result;
}
