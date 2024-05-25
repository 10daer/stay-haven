import supabase, { supabaseUrl } from "./supabase";

export async function loginAuth({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Incorrect password or email provided");

  return data?.user;
}

export async function signupAuth({ email, password, name }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName: name, avatar: "" } },
  });

  if (error) throw new Error("Incorrect email or password provided");

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error("Unable to get user credentials");

  return data?.user;
}

export async function logoutAuth() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("An error occured while loggin out");
}

export async function updateUserData({ fullName, password, avatar }) {
  let newUserData;

  if (fullName) newUserData = { data: { fullName } };
  if (password) newUserData = { password };

  const { data, error } = await supabase.auth.updateUser(newUserData);

  if (error) throw new Error("An error occured while updating user data");
  if (!avatar) return data;

  const avatarPath = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(avatarPath, avatar);

  if (storageError)
    throw new Error("An error occured while uploading the avatar");

  const { data: updatedData, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarPath}`,
      },
    });

  if (updateError) throw new Error(updateError.message);

  return updatedData;
}
