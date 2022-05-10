import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${process.env.BASEURL}/project/${context.params}`);
  const selectedProject = await res.json();

  if (!selectedProject) {
    return { notFound: true };
  }
  return { props: { selectedProject } };
};
