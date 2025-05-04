import { supabase } from './supabaseClient';
import { Buffer } from 'buffer';

async function imageUpload(base64String: string, fileName: string = 'image.jpg') {
  try {
    const blob = new Blob([Buffer.from(base64String, 'base64')], {
      type: 'image/jpeg',
    });
    

    const { data, error } = await supabase
      .from('user-avatars')
      .upload(fileName, blob, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data: publicUrlData } = supabase
      .from('user-avatars')
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl;

  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

export { imageUpload };
