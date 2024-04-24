'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  function handleChange(event) {
  setSelectedImage(event.target.files[0]);
}

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/file/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await res.json();
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Upload a File</h1>
        <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg p-8 mb-4">
          <label className="cursor-pointer flex flex-col items-center justify-center" htmlFor="file-upload">
            <UploadIcon className="h-12 w-12 text-gray-500 dark:text-gray-400 mb-2" />
            <span className="text-gray-500 dark:text-gray-400">Drag and drop a file or click to upload</span>
            <input accept="image/*" className="sr-only" id="file-upload" type="file" onChange={handleChange} />
          </label>
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <img
            alt="Uploaded File"
            className="w-full h-auto rounded-lg object-cover"
            height={300}
            src={selectedImage ? URL.createObjectURL(selectedImage):"https://placehold.co/400" }            style={{
              aspectRatio: "400/300",
              objectFit: "cover",
            }}
            width={400}
          />
        </div>
        <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full" onClick={uploadFile}>Upload File</Button>
      </div>
    </div>
  )
}


function Button(props) {
  return (
    <button className={props.className} onClick={props.onClick}>{props.children}</button>
  )
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}