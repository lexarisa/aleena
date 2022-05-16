import styles from '../../styles/TextEditor.module.css';
import 'react-quill/dist/quill.bubble.css';
// import 'highlight.js/styles/darcula.css';

import dynamic from 'next/dynamic';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
    [{ script: 'sub' }, { script: 'super' }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'code-block',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

export default function Article({ data }: any) {
  return (
    <>
      <h1>{data.title}</h1>
      <div className={styles.container}>
        <QuillNoSSRWrapper modules={modules} formats={formats} theme="bubble" />
      </div>
    </>
  );
}
