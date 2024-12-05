// pages/index.tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

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
            <Head>
                <link
                    rel="preload"
                    href={`/images/presidents/${randomShortName}.webp`}
                    as="image"
                />
            </Head>
            <p>Hotus or Notus?</p>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { fetchRandomPresident } = await import('../lib/presidents');
    const randomPresident = fetchRandomPresident();
    
    return {
      props: {
        randomShortName: randomPresident?.shortname || null,
      }
    };
  };

export default HomePage;
