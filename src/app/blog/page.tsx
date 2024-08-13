// 'use client';

// import React, { useState } from 'react';
// import BlogForm from './blogform';
// import BlogList from './bloglist';
// import useBlogs, { Blog } from '../hooks/useBlog';

// const TestPage: React.FC = () => {
//   const { blogs, loading, error, createBlog, updateBlog, deleteBlog } = useBlogs();
//   const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

//   const handleSaveBlog = (blog: Blog) => {
//     if (blog._id) {
//       updateBlog(blog._id, blog);
//     } else {
//       createBlog(blog);
//     }
//     setEditingBlog(null);
//   };

//   const handleEditBlog = (blog: Blog) => {
//     setEditingBlog(blog);
//   };

//   return (
//     <div>
//       {loading && <>Loading</>}
//       {blogs && (
//         <>
//           <h1>Test MongoDB Connection</h1>
//           <BlogList blogs={blogs} onDelete={deleteBlog} onEdit={handleEditBlog} />
//           <BlogForm initialBlog={editingBlog} onSave={handleSaveBlog} />
//         </>
//       )}
//       {error && <>something went wrong</>}
//     </div>
//   );
// };

// export default TestPage;
