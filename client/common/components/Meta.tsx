import Head from 'next/head';

interface IHeadProps {
  title: string;
  keywords?: string;
  description?: string;
}

const Meta = ({ title, keywords, description }: IHeadProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
      </Head>
    </div>
  );
};

export default Meta;
