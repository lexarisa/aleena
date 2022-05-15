// import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
// import React from 'react';

// const Article = () => {
//   return (
//     <div>
//       <p>hello</p>
//     </div>
//   );
// };
// export default Article;

import React from 'react';
import { useState } from 'react';
// import ReactQuill from 'react-quill';
const ReactQuill = require('react-quill');

interface Props {
  placeholder: string;
}

const CustomToolbar: React.FC<{ onClickRaw: () => void }> = ({
  onClickRaw,
}) => (
  <div id="toolbar">
    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option selected></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option selected></option>
    </select>
    <button onClick={onClickRaw}>Raw</button>
  </div>
);

const Article: React.FC<Props> = ({ placeholder }) => {
  const [editor_html, setEditorHTML] = useState<string>('');
  const [raw_html, setRawHTML] = useState<string>('');
  const [show_raw, setShowRaw] = useState<boolean>(false);
  const handleClickShowRaw = (): void => {
    setShowRaw(!show_raw);
    if (show_raw) setEditorHTML(raw_html);
    else setRawHTML(editor_html);
  };
  return (
    <div className={show_raw ? 'showRaw' : ''}>
      <div className={'text-editor'}>
        <CustomToolbar onClickRaw={handleClickShowRaw} />
        <ReactQuill
          onChange={(html): void => setEditorHTML(html)}
          placeholder={placeholder}
          modules={{
            toolbar: {
              container: '#toolbar',
              handlers: {},
            },
          }}
          formats={[
            'header',
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
            'color',
          ]}
          value={editor_html}
          theme={'snow'}
        />
        <textarea
          className={'raw-editor'}
          onChange={(e): void => setRawHTML(e.target.value)}
          value={raw_html}
        />
      </div>
    </div>
  );
};

export default Article;
