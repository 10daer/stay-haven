import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error.message);
    error.message =
      error.message === "TypeError: Failed to fetch"
        ? "Error fetching data: Check your Internet connection"
        : "Cabin could not be found";
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCabin(id) {
  let { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imageIsUrl = newCabin.image?.startsWith?.(supabaseUrl);
  const imagePath = imageIsUrl
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (uploadError) {
    console.log(error.message);
    throw new Error("Unable to create new cabin(File upload failed)");
  }

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error.message);
    throw new Error("A new cabin could not be created");
  }

  return data;
}
