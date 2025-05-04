import { supabase } from './supabaseClient';

async function imageUpload(uri: string, fileName: string = 'image.jpg') {
  try {
    // // Tạo data URI
    // const base64DataUri = `data:image/jpeg;base64,${base64String}`;

    // // Dùng fetch để chuyển data URI thành Blob
    // const response = await fetch(base64DataUri);
    // if (!response.ok) throw new Error('Failed to create blob');
    const response = await fetch(uri);
    const blob = await response.blob();

    const { data, error } = await supabase.storage
      .from('user-avatars')
      .upload(fileName, blob, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('user-avatars')
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl;

  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

export { imageUpload };
