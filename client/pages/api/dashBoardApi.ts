import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `${process.env.BASEURL}/getDashboard/${context.params}` //still have to add proper params
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

//typescript for later

// import { InferGetServerSidePropsType } from 'next'

// function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   // will resolve posts to type Data
// }
