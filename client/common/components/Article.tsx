// import hljs from 'highlight.js';

// import 'highlight.js/styles/darcula.css';
import styles from '../../styles/Article.module.css';
import 'react-quill/dist/quill.bubble.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import RoundButton from './small/RoundButton';
import { updateArticle, deleteArticle } from '../../pages/api/article.api';
import { bookmarkArticle } from '../../pages/api/article.api';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { BsTrash, BsPlus } from 'react-icons/bs';

// hljs.configure({
//   languages: ['javascript', 'ruby', 'python', 'rust'],
// });
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
  // syntax: (text) => hljs.highlightAuto(text).value,
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
  const dispatch = useAppDispatch();
  const reduxCurrentArticle = useAppSelector(
    (state) => state.article.currentArticle
  );
  const reduxCurrentUser = useAppSelector((state) => state.user.id);

  const [content, setContent] = useState(data.content);

  const handleChange = (newText: any) => {
    setContent(newText);
  };
  const handleSave = () => {
    // setShowArticle(false);
    console.log('DATA ID IN ARTICLE', data.id);
    updateArticle(reduxCurrentArticle.id, reduxCurrentArticle.title, content);
    console.log('content', content);
  };

  const handleDelete = () => {
    // setShowArticle(false);
    deleteArticle(data.id);
  };
  const handleBookmark = () => {
    console.log('article id', data.id);
    console.log('user', reduxCurrentUser);
    bookmarkArticle(data.id, reduxCurrentUser); // article , user
  };
  return (
    <>
      {/* <RoundButton
        button="bookmark"
        onClick={handleBookmark}
        color="#333"
        textColor="#fff"
      /> */}
      <div onClick={handleBookmark}>
        <BsFillBookmarkFill />
      </div>
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
      <div className={styles.buttonContainer}>
        {/* <RoundButton
          button="delete"
          onClick={handleDelete}
          color="#333"
          textColor="#fff"
        /> */}

        <div onClick={handleDelete}>
          <BsTrash />
        </div>
        <div onClick={handleSave}>
          <BsPlus />
        </div>

        {/* 
        <RoundButton
          button="save"
          onClick={handleSave}
          color="#333"
          textColor="#fff"
        /> */}
      </div>
    </>
  );
}
