import { useState } from 'react';
import { getProviders, useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import styles from './login.module.css';
import { useRouter } from 'next/router';

export default function Login() {
  const [name, setName] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await signIn('credentials',
    {
      email:name,
      password: '',
      callbackUrl: `${window.location.origin}/home` 
    })

    if(response) router.push('/home');
  };

  return (
    <div className={styles['login-container']}>
      <h1 className={styles['login-title']}>Login</h1>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={styles['login-label']}>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles['login-input']}
          />
        </div>
        <button type="submit" className={styles['login-button']} onClick={() => {signIn()}}>Submit</button>
      </form>
    </div>
  );
}
