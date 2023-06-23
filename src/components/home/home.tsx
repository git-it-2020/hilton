// components/Home.tsx

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from './home.module.css';

type Post = {
  title: string;
  body: string;
  id: number;
  userId: number;
};

type HomeProps = {
  serverData: Post[];
};

export default function Home({ serverData }: HomeProps) {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function validateSession() {
      // Check if session exists
      if (sessionStatus === 'authenticated') {
        return;
      }

      // If session status is "loading", wait for it to be resolved
      if (sessionStatus === 'loading') {
        return;
      }

      // If session status is "unauthenticated", redirect to the login page
      router.push('/login');
    }
    validateSession();
  }, [sessionStatus, router]);

  if (sessionStatus === 'loading') {
    // Render a loading state while session is being checked
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles['title']}>Welcome, {session?.user?.name}</div>
      <div>
        {serverData.map((x) => {
          return (
            <div className={styles['post-container']} key={x.id}>
              <div className={styles['post-title']}>
                <b>{x.title}</b>
              </div>
              <div>{x.body}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
