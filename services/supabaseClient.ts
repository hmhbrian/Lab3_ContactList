import { StorageClient } from '@supabase/storage-js';

const SUPABASE_URL = 'https://kagzyupkqohvhzjsjrew.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZ3p5dXBrcW9odmh6anNqcmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4OTQ4MzYsImV4cCI6MjA2MTQ3MDgzNn0.-3Q_7dVSOzPqRG8oWINnmQvA3Ib8VFzMSBbdV0VcXGQ';

export const supabase = new StorageClient(`${SUPABASE_URL}/storage/v1`, {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  });