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

export const fetchComments = async (id) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("comment")
      .eq("content_id", id)

    if (error) {
      console.error("Error fetching comments:", error.message);
      return []; // Devuelve un arreglo vacío si hay un error
    } else {
      return data // Devuelve los comentarios obtenidos
    }
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    return []; // Devuelve un arreglo vacío si hay un error
  }
};


