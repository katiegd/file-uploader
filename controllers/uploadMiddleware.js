const { createClient } = require("@supabase/supabase-js");
const { urlencoded } = require("express");
require("dotenv").config();

const supabaseKey = process.env.SUPABASE_API;
const subabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Create Supabase client
const supabase = createClient(subabaseUrl, supabaseServiceKey, {
  headers: {
    Authorization: `Bearer ${supabaseServiceKey}`,
  },
});

// Upload file using standard upload
async function uploadFile(file, filePath) {
  try {
    const { data, error } = await supabase.storage
      .from("file-uploads")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading file.", error);
      return null;
    }
  } catch (error) {
    console.error("Error uploading file.", error);
    throw error;
  }
}

async function deleteFile(filePath) {
  try {
    const { data, error } = await supabase.storage
      .from("file-uploads")
      .remove([filePath]);

    if (error) {
      console.error("Error deleting file.", error);
      return null;
    }
  } catch (error) {
    console.error("Error deleting file.", error);
    throw error;
  }
}

async function downloadFile(filePath) {
  try {
    const { data, error } = await supabase.storage
      .from("file-uploads")
      .download(filePath);

    if (error) {
      console.error("Error downloading file.", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Error downloading file.", err);
  }
}

module.exports = { supabase, uploadFile, deleteFile, downloadFile };
