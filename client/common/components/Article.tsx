import styles from '../../styles/TextEditor.module.css';
import 'react-quill/dist/quill.bubble.css';
// import 'highlight.js/styles/darcula.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import RoundButton from './small/RoundButton';

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
  const [content, setContent] = useState('');

  const handleChange = (newText: any) => {
    setContent(newText);
  };
  const handleSave = () => {
    console.log(content);
  };
  return (
    <>
      <div className={styles.container}>
        <h1>{data.title}</h1>
        <QuillNoSSRWrapper
          modules={modules}
          formats={formats}
          theme="bubble"
          value={content}
          onChange={handleChange}
          placeholder="add some documentation"
        />
      </div>
      <RoundButton
        button="save"
        onClick={handleSave}
        color="#333"
        textColor="#fff"
      />
    </>
  );
}
