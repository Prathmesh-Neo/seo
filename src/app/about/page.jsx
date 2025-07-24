// import { use } from "react";

// export async function generateMetadata() {
//   let posts = await fetchPosts();
//   const titles = posts.map((post) => post.title)
//   const des = posts.map((post) => post.body)
//   return {
//     title: 'about',
//     description: des,
//     keywords: [...titles, ...des]
//   }
// }

// async function fetchPosts() {
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts',
//       {
//         cache: 'force-cache',
//         next: { revalidate: 60 }
//       },
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch: ${res.status}`);
//     }
//     if (res.status === 404) {
//       console.log('404')
//     }

//     return await res.json();
//   } catch (err) {
//     throw new Error('Error fetching posts: ' + err.message);
//   }
// }
// function page() {

//   let posts = use(fetchPosts())
//   console.log(posts)
//   return (
//     <div className="lg:m-10 m-1">
//       <table className="border-collapse w-[100%] border" >
//         <thead>
//           <tr className="border">
//             <th>Sr</th>
//             <th>Id</th>
//             <th>Title</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//         {posts.map((post, index) => (
//           <tbody key={index}>
//             <tr className="text-center p-1">
//               <td className="border p-1 ">{post.id}</td>
//               <td className="border p-2">{post.userId}</td>
//               <td className="border"> {post.title}</td>
//               <td className="border">{post.body}</td>
//             </tr>
//           </tbody>
//         ))}
//       </table>

//     </div>
//   )
// }

// export default page


// app/about/page.tsx
import { use } from 'react';

async function fetchPosts() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      cache: 'force-cache',
      next: { revalidate: 3600 }, // Revalidate every 1 hour
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error('Error fetching posts:', err);
    return [];
  }
}

// Dynamic metadata generation for SEO
export async function generateMetadata() {
  const posts = await fetchPosts();

  const titles = posts.map((post) => post.title);
  const descriptions = posts.map((post) => post.body);

  const keywordList = [...titles, ...descriptions]
    .join(' ')
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .split(/\s+/)
    .filter((word, index, arr) => word.length > 3 && arr.indexOf(word) === index) // Deduplicate & filter short words
    .slice(0, 300); // Limit for meta tag

  return {
    title: 'About Us – SEO Optimized',
    description: descriptions.slice(0, 5).join(' ').slice(0, 300),
    keywords: keywordList.join(', '),
  };
}

export default function AboutPage() {
  const posts = use(fetchPosts());

  return (
    <div className="p-4 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <table className="w-full border border-gray-300 text-sm lg:text-base">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sr</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2 text-center">{post.userId}</td>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
