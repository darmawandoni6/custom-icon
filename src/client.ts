import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://owmqsukrsetzazjhkxrz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93bXFzdWtyc2V0emF6amhreHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwNTEwNzIsImV4cCI6MjAzMDYyNzA3Mn0.GrvNDgWTCR9QfeNnePDIPVWI7bbEwhXR-U0GiNDGZQE';

export const supabase = createClient(supabaseUrl, supabaseKey);
