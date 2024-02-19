import React, { useEffect, useState } from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import TodoListItem from "./TodoListItem";
import axios from "axios";

const TodoListcontainer = () => {
  const [todoToday, setTodoToday] = useState([]);
  const [todoPending, setTodoPending] = useState([]);
  const [TodoCompleted, setTodoCompleted] = useState([]);
  const [todoListArray, setTodoListArray] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/todo/today`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("userToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTodoToday(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/todo/remaining`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("userToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTodoPending(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/todo/done`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("userToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTodoCompleted(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [todoItem, setTodoItem] = useState("");

  const handleChange = (e) => {
    setTodoItem(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("userToken");
      console.log(token);
      console.log(todoItem);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/todo/add`,
        { todo: todoItem }, // Send todoItem as an object in the request body
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" py-10 px-3 sm:px-6">
      <h1 className=" text-4xl font-bold text-stone-800 pb-4">Todolist</h1>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 justify-center gap-5 ">
        <div className=" bg-stone-50 shadow rounded py-6 px-3 sm:px-6">
          <h1 className=" font-bold text-3xl text-stone-700">Today's Task</h1>
          <div className=" py-4 flex flex-col gap-2">
            {todoToday?.map((item, index) => (
              <TodoListItem
                key={index}
                type="not done"
                id={item._id}
                date={item.createdAt}
                todoItem={item.todo}
              />
            ))}
          </div>
          <form
            onSubmit={onSubmit}
            className=" flex items-center gap-1.5 w-full"
          >
            <input
              type="text"
              placeholder="Enter the task"
              onChange={handleChange}
              value={todoItem}
              className=" border border-stone-300 focus:outline-none py-1.5 px-3 rounded text-stone-700 w-full"
              required
            />
            <button
              type="submit"
              className=" bg-primary rounded py-1.5 px-3 font-medium text-white"
            >
              Add
            </button>
          </form>
        </div>

        <div className=" bg-stone-50 shadow rounded py-6 px-3 sm:px-6 ">
          <h1 className=" font-bold text-3xl text-stone-700">Pending Task</h1>
          <div className=" py-4 flex flex-col gap-2">
            {todoPending?.map((item, index) => (
              <TodoListItem
                key={index}
                type="not done"
                id={item._id}
                date={item.createdAt}
                todoItem={item.todo}
              />
            ))}
          </div>
        </div>

        <div className=" bg-stone-50 shadow rounded py-6 px-3 sm:px-6">
          <h1 className=" font-bold text-3xl text-stone-700">Completed Task</h1>
          <div className=" py-4 flex flex-col gap-2">
            {TodoCompleted?.map((item, index) => (
              <TodoListItem
                key={index}
                type="done"
                id={item._id}
                date={item.createdAt}
                todoItem={item.todo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListcontainer;
