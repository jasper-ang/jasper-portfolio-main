'use client';

import React, { FC, useEffect, useState } from 'react';

export interface Blog {
  _id?: string;
  title: string;
  content: string;
}

interface BlogComponentProps {
  setData: React.Dispatch<React.SetStateAction<Blog[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const API_URL = 'http://localhost:5050/record/';

const BlogComponent: FC<BlogComponentProps> = ({ setData, setLoading }) => {
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [setData, setLoading]);

  return null; // No rendering in this component
};

export default BlogComponent;

// const API_URL = 'http://localhost:5050/record/';

// const BlogComponent = () => {
//   const [data, setData] = useState<Blog[]>([]);
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(API_URL)
//       .then(res => res.json())
//       .then(data => {
//         setData(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, []);

//   // if (isLoading) {
//   //   return (
//   //     <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
//   //       Loading...
//   //     </div>
//   //   );
//   // }

//   // return (
//   //   <div className="bg-gray-900 min-h-screen p-4">
//   //     {data.length === 0 ? (
//   //       <div className="text-center text-white">No blogs available</div>
//   //     ) : (
//   //       <div className="max-w-xl mx-auto space-y-4">
//   //         {data.map(blog => (
//   //           <div
//   //             key={blog._id}
//   //             className="bg-gray-800 p-3 rounded-lg shadow-md hover:bg-gray-700 transition w-full md:w-auto"
//   //           >
//   //             <h2 className="text-lg font-bold text-white truncate">{blog.title}</h2>
//   //             {/* Removed content display */}
//   //           </div>
//   //         ))}
//   //       </div>
//   //     )}
//   //   </div>
//   // );

//   return null; // Since it's only used for fetching data
// };

// export default BlogComponent;
