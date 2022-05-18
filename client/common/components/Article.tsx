// import hljs from 'highlight.js';

// import 'highlight.js/styles/darcula.css';
import styles from '../../styles/Article.module.css';
import 'react-quill/dist/quill.bubble.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { updateArticle, deleteArticle } from '../../pages/api/article.api';
import { bookmarkArticle } from '../../pages/api/article.api';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
// import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { BsTrash, BsPlus } from 'react-icons/bs';
import { createBookmark } from '../store/slices/user/user.slice';
import { IoStarOutline, IoStar } from 'react-icons/io5';

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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useAppDispatch();
  const reduxCurrentUser = useAppSelector((state) => state.user.id);

  const reduxCurrentArticle = useAppSelector(
    (state) => state.article.currentArticle
  );

  // const userBookmarks = useAppSelector((state) => state.user.bookmarks);
  // const userBookmarksIds = userBookmarks.map((a: any) => a.article_id); // map and create id array

  const handleCreateBookmark = () => {
    bookmarkArticle(data.id, reduxCurrentUser); //DB
    // dispatch(createBookmark(data)); //STORE
    setIsBookmarked(true);
  };
  // const handleDeleteBookmark = () => {
  //   //set it in DB
  //   dispatch(deleteBookmark(data)); //STORE
  //   setIsBookmarked(false);
  // };

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

  {
    /* {isBookmarked ? (
    <div onClick={handleDeleteBookmark}>
      <IoStar />
    </div>
  ) : (
    <div onClick={handleCreateBookmark}>
      <IoStarOutline />
    </div>
  )} */
  }
  return (
    <>
      <div onClick={handleCreateBookmark}>
        <IoStarOutline />
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
        <div onClick={handleDelete}>
          <BsTrash />
        </div>
        <div onClick={handleSave}>
          <BsPlus />
        </div>
      </div>
    </>
  );
}
