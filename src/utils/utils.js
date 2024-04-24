import supabase from "../clients";


export const updateCount = async (id, count, setCount) => {
  try {
    const { data, error } = await supabase
      .from("post")
      .update({ upvotes: count + 1 })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating likes count:", error.message);
    } else {
      setCount((count) => count + 1);
    }
  } catch (error) {
    console.error("Error updating likes count:", error.message);
  }
};

export async function fetchComments(id) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("content_id", id);

    if (error) {
      throw new Error("Error fetching comments: " + error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    return [];
  }
}

export async function createComment(comment) {
  try {
    await supabase.from("comments").insert([comment]);
  } catch (error) {
    console.error("Error creating comment:", error.message);
    throw error;
  }
}