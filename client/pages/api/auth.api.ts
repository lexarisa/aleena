import { GetServerSideProps } from 'next';
import Cryptr from 'cryptr';

const cryptr = new Cryptr(`${process.env.ENC_SECRET}`);

export const getAuth: GetServerSideProps = async (context) => {
    const res = await fetch(`${process.env.BASEURL}/getDashboard/${context.params}`);
    
      const data = await res.json();
      return {
        props: {
        },
      };
};