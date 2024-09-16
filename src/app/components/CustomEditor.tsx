// components/CustomEditor.tsx

import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CustomEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomToolbar = () => (
  <div id="toolbar" className="mb-2 flex flex-wrap gap-2">
    <select className="ql-header select select-bordered select-sm" defaultValue="">
      <option value="">Normal</option>
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="3">Heading 3</option>
    </select>
    <button className="ql-bold btn btn-outline btn-sm" title="Bold">
      B
    </button>
    <button className="ql-italic btn btn-outline btn-sm" title="Italic">
      I
    </button>
    <button className="ql-underline btn btn-outline btn-sm" title="Underline">
      U
    </button>
    <button className="ql-list btn btn-outline btn-sm" value="ordered" title="Ordered List">
      1.
    </button>
    <button className="ql-list btn btn-outline btn-sm" value="bullet" title="Bullet List">
      •
    </button>
    <button className="ql-link btn btn-outline btn-sm" title="Link">
      🔗
    </button>
    <button className="ql-image btn btn-outline btn-sm" title="Image">
      🖼️
    </button>
  </div>
);

const CustomEditor: React.FC<CustomEditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  };

  const formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet', 'link', 'image'];

  return (
    <div className="text-base-content">
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="bg-base-100"
      />
    </div>
  );
};

export default CustomEditor;
