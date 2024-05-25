import supabase from "./supabase";

export async function getGuests() {
  let { data, error } = await supabase.from("guests").select("*");

  if (error) {
    console.log(error.message);
    error.message =
      error.message === "TypeError: Failed to fetch"
        ? "Error fetching data: Check your Internet connection"
        : "Guests could not be found";
    throw new Error(error.message);
  }

  return data;
}

export async function createGuestApi(newGuest) {
  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select()
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("New Guest could not be created");
  }

  return data;
}
