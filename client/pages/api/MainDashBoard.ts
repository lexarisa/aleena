const URL = 'http://localhost:3001';
export const getServerSideProps = async (context) => {
  const res = await fetch(`${URL}/getDashboard`);

  const;

  return {
    props: {},
  };
};
