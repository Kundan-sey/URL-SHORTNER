import supabase, { supabaseUrl } from "./supabase";
import UAParser from "ua-parser-js";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching URLs:", error);
    throw new Error(`Unable to load URLs: ${error.message}`);
  }

  return data;
}

export async function getUrl({ id, user_id }) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error("Error fetching short URL:", error);
    throw new Error(`Short URL not found: ${error.message}`);
  }

  return data;
}

export async function createUrl({ title, longUrl, customUrl, user_id }, qrcode) {
  try {
    const short_url = Math.random().toString(36).substr(2, 6);
    const fileName = `qr-${short_url}`;

    // Upload QR code
    const { error: storageError } = await supabase.storage
      .from("qrs")
      .upload(fileName, qrcode);

    if (storageError) {
      console.error("Error uploading QR code:", storageError);
      throw new Error(`Error uploading QR code: ${storageError.message}`);
    }

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

    // Insert URL data
    const { data, error } = await supabase
      .from("urls")
      .insert([
        {
          title,
          user_id,
          original_url: longUrl,
          custom_url: customUrl || null,
          short_url,
          qr,
        },
      ])
      .select();

    if (error) {
      console.error("Error creating short URL:", error);
      throw new Error(`Error creating short URL: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error("Unexpected error in createUrl:", err);
    throw new Error(`Unexpected error in createUrl: ${err.message}`);
  }
}

export async function getLongUrl(id) {
  const { data: shortLinkData, error: shortLinkError } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (shortLinkError) {
    console.error("Error fetching long URL:", shortLinkError);
    return { error: shortLinkError.message };
  }

  if (!shortLinkData) {
    console.error("No URL found for the given ID:", id);
    return { error: "No URL found" };
  }

  return shortLinkData;
}

export async function deleteUrls(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error("Error deleting URL:", error);
    throw new Error(`Unable to delete URL: ${error.message}`);
  }

  return data;
}
