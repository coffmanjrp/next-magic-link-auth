import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { elements } = e.target;

    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({
      email: elements.email.value,
    });

    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` },
    });

    if (authRequest.ok) {
      router.push('/dashboard');
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" />
      <button>Login</button>
    </form>
  );
};

export default Login;
