import { Todo, TodoEdit } from "@customTypes/Todo";
import { AxiosError } from "axios";
import initAxios from "../client";

const editTodo = async (todoToEdit: TodoEdit): Promise<Todo> => {
  try {
    const client = initAxios();
    const todo = (await client.put("/api/todo", { todo: todoToEdit })).data
      .todo;

    return todo as Todo;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const response = e.response?.statusText;

      if (response) {
        if (response === "TODO_NOT_FOUND") {
          throw new Error("Todo not found");
        } else if (response === "DESCRIPTION_REQUIRED") {
          throw new Error("Description is required");
        } else if (response === "COLOR_REQUIRED") {
          throw new Error("Color is required");
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        throw new Error("Unknown error has appeared");
      }
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export default editTodo;
