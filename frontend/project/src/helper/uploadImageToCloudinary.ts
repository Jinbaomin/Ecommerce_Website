const upload_present = 'next_tech'
const cloud_name = 'dm0gprckx'
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

export const uploadImageToCloudinary = async (file: any) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', upload_present);
  data.append('cloud_name', cloud_name);

  const res = await fetch(api_url, {
    method: 'POST',
    body: data
  });

  const fileData = await res.json();
  return fileData.url;
}