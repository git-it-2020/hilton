// pages/index.tsx

import { GetServerSideProps } from 'next';
import Home from '../../components/home/home';

type HomeProps = {
  serverData: string;
};

export default function HomePage({ serverData }: HomeProps) {
  return <Home serverData={serverData} />;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // Fetch data from your server or an API
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  const serverData = data;

  return {
    props: {
      serverData,
    },
  };
}
