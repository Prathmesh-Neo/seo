// import React, { use } from 'react'

// function ApiFetchData({ API_URL }) {
//     let err = '';
//     let loading = false;
//     let message = '';
//     const data = use(
//         (async () => {
//             try {
//                 loading = true;
//                 const res = await fetch(`${API_URL}`);
//                 const data = await res.json();
//                 if (res.ok) {
//                     message = res.message || "fetched data"
//                     return data;
//                 } else {
//                     loading = false;
//                     err = res.message;
//                     return res.message;
//                 }
//             } catch (error) {
//                 console.log(error.message)
//                 err = error.message;
//             }
//         })()

//     );
//     return { data, err, loading, message }
// }

// export default ApiFetchData


// lib/fetchData.js

export  default async function getData({API_URL}) {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' }); 
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || 'Failed to fetch data');
    }

    return {data};
  } catch (error) {
    throw new Error(error.message);
  }
}
