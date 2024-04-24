import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function convertFile(file) {
  const FileBuffer = await new Response(file).arrayBuffer(); //fil array buffer
  var base64 = btoa(
    new Uint8Array(FileBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  const dataURI = "data:" + file.type + ";base64," + base64;
  console.log(file.type, "type");

  return dataURI;
}

export async function POST(req, res) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") ;
    console.log("file", file, "file");


      const imageData = await convertFile(file);
      console.log(imageData, 'base64 data');// convert file to data URI
    const res = await cloudinary.uploader.upload(imageData);
    console.log(res.secure_url,'url');
    return new Response(JSON.stringify({ fileUrl: res.secure_url }), {
      status: 200,
    });
  } catch (error) {
    console.error(error, "error");
    return new Response(JSON.stringify({ message: "Server upload error" }), {
      status: 500,
    });
  }
}