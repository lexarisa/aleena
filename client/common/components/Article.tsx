// import hljs from 'highlight.js';

// import 'highlight.js/styles/darcula.css';
import styles from '../../styles/Article.module.css';
import 'react-quill/dist/quill.bubble.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { updateArticle, deleteArticle } from '../../pages/api/article.api';
import {
  bookmarkArticle,
  unBookmarkArticle,
} from '../../pages/api/article.api';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
// import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { BsTrash, BsPlusLg } from 'react-icons/bs';
import {
  createBookmark,
  deleteBookmark,
} from '../store/slices/user/user.slice';
import { IoStarOutline, IoStar } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import RoundButton from './small/RoundButton';
import CustomButton from './small/CustomButton';

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

export default function Article({ data, setShowArticle }: any) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useAppDispatch();
  const reduxCurrentUser = useAppSelector((state) => state.user.id);

  const reduxCurrentArticle = useAppSelector(
    (state) => state.article.currentArticle
  );

  const userBookmarks = useAppSelector((state) => state.user.bookmarks);
  const userBookmarksIds = userBookmarks.map((a: any) => a.id); // map and create id array
  if (userBookmarksIds.includes(data.id)) console.log('booked');

  const handleCreateBookmark = () => {
    if (userBookmarksIds.includes(data.id)) {
      setIsBookmarked(true);
      return;
    }
    bookmarkArticle(data.id, reduxCurrentUser); //DB
    dispatch(createBookmark(data)); //STORE
    setIsBookmarked(true);
  };
  const handleDeleteBookmark = () => {
    // unBookmarkArticle(reduxCurrentUser, `${data.id}`); //DB
    console.log('delete');
    dispatch(deleteBookmark(data.id)); //STORE
    setIsBookmarked(false);
  };

  const [content, setContent] = useState(data.content);

  const handleChange = (newText: any) => {
    setContent(newText);
  };
  const handleSave = () => {
    console.log('DATA ID IN ARTICLE', data.id);
    updateArticle(reduxCurrentArticle.id, reduxCurrentArticle.title, content);
    console.log('content', content);
    setShowArticle(false);
  };

  const handleDelete = () => {
    deleteArticle(data.id);
    setShowArticle(false);
  };

  return (
    <>
      <div className={styles.buttonContainerHeader}>
        {isBookmarked && userBookmarksIds.includes(data.id) ? (
          <div onClick={handleDeleteBookmark}>
            <IoStar className={styles.icon} />
          </div>
        ) : (
          <div onClick={handleCreateBookmark}>
            <IoStarOutline className={styles.icon} />
          </div>
        )}

        <div onClick={() => setShowArticle(false)}>
          <AiOutlineClose className={styles.icon} />
        </div>
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
          // style={styles.textEditorContainer}
          style={{ backgroundColor: 'transparent' }}
        />
      </div>
      <div className={styles.buttonContainer}>
        <div onClick={handleDelete}>
          <BsTrash className={styles.deleteIcon} />
        </div>
        <CustomButton
          button="Save"
          textColor="#fff"
          color="#415a77"
          onClick={handleSave}
        />
      </div>
    </>
  );
}