import {UAParser} from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksForUrls(urlId) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", urlId);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}
export async function getClicksForUrlsDash(urlId) {
  // console.log('getClicksForUrls received urlId:', urlId); // Log received urlId
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlId);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

const parser = new UAParser();

export async function getClicksForUrl(url_id) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}

export const storeClicks = async ({ id, originalUrl }) => {
  try {
    // Get the result from parser
    const res = parser.getResult();
    
    // Safely get the device type, default to 'desktop' if not found
      const device = res.os.name || "desktop";

    
    // Fetch location data from ipapi
    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    
    // Record the click in the database
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });
    window.location.href = originalUrl;
  } catch (error) {
    // Log detailed error information
    console.error("Error recording click:", error);
  }
};
