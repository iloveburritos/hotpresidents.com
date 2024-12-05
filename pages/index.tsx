// pages/index.tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout';

interface HomePageProps {
    randomShortName: string;
}

const HomePage: React.FC<HomePageProps> = ({ randomShortName }) => {
    const router = useRouter();

    useEffect(() => {
        router.push(`/vote/${randomShortName}`);
    }, [router, randomShortName]);

    return (
        <Layout>
            <p>Hotus or Notus?</p>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { fetchRandomPresident } = await import('../lib/presidents');
    const randomPresident = fetchRandomPresident();
    
    // Add preload headers
    const imagePreloadHeader = {
      key: 'Link',
      value: `<${randomPresident.imageURL}>; rel=preload; as=image`
    };
  
    return {
      props: {
        randomShortName: randomPresident?.shortname || null,
      },
      headers: [imagePreloadHeader]
    };
  };

export default HomePage;
