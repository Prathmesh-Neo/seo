export const dynamic = 'force-dynamic';
import getData from "@/Components/fetchData";
import Posts from "../posts/page";
// export async function generateMetadata() {
//   const { data } = await getData({ API_URL: 'https://jsonplaceholder.typicode.com/posts' })
//   const titles = data.map((post) => post.title)
//   const des = data.map((post) => post.body)
//   return {
//     title: 'about',
//     description: des[0],
//     keywords: [...titles]
//   }
// }

async function page() {
  const { data } = await getData({ API_URL: 'https://jsonplaceholder.typicode.com/posts' })

  console.log('data', data)
  return (
    <div className="lg:m-10 m-1">
      <table className="border-collapse w-[100%] border" >
        <thead>
          <tr className="border">
            <th>Sr</th>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        {data.map((post, index) => (
          <tbody key={index}>
            <tr className="text-center p-1">
              <td className="border p-1 ">{post.id}</td>
              <td className="border p-2">{post.userId}</td>
              <td className="border"> {post.title}</td>
              <td className="border">{post.body}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <Posts />
    </div>
  )
}

export default page
