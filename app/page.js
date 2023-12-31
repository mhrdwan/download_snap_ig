'use client'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [username, setUsername] = useState(""); // State for username
  const [data, setData] = useState(""); // State for data
  const [snapdata, setsnapdata] = useState(""); // State for data
  const [loading, setloading] = useState(false)
  async function ambilprofile(username) {
    setloading(true)
    const response = await axios.get(`/api/instagramV1/GetProfile/${username}`);
    console.log(response.data);
    setData(response.data.data);
    setsnapdata(response?.data?.snapdata);
    setloading(false)
  }
  console.log(`snapdata`, snapdata?.reels_media?.[0]);
  return (
    <div className='h-screen'>
      <div className='justify-center space-y-3 mt-10 flex flex-col items-center w-screen overflow-hidden'>
        <h1>Masukkan username</h1>
        <input
          className='text-black'
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state on change
        />
        <button
          onClick={() => ambilprofile(username)}
          disabled={loading}
          className='p-2 bg-teal-300 rounded-lg'
        >
          {loading ? "loading..." : "Cari"}
        </button>
        {data && (
          <>
            <Image width={100} height={100} src={data.user?.profile_pic_url} alt="Profile" />
            <p>Username : {data.user?.username}</p>
            <p>Nama Panjang : {data.user?.full_name}</p>
            <div className='w-full flex flex-col items-center justify-center p-3 overflow-x-auto'>
              <h1 className='mt-5'>Snap IG ada {snapdata?.reels_media[0]?.items.length} </h1>
              <div className='mt-5 grid grid-cols-2 md:grid-cols-4 sm:grid-cols-1 gap-4 '>
                {snapdata?.reels_media[0]?.items.map((item, index) => (
                  item.image_versions2 &&
                  <div key={index} className='flex flex-col items-center p-3'>
                    <Image
                      width={100}
                      height={100}
                      src={item.image_versions2.candidates[0].url}
                      alt={`Image ${index}`}
                    />
                    {item.video_versions ?
                      <a
                        href={item.video_versions[0].url}
                        download
                        className="btn-download p-2 bg-teal-300 rounded-xl text-black mt-3">
                        Download Video
                      </a>
                      :
                      <a
                        href={item.image_versions2.candidates[0].url}
                        download
                        className="btn-download p-2 bg-purple-300 rounded-xl text-black mt-3">
                        Download Image
                      </a>
                    }
                  </div>
                ))}
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  )
}
