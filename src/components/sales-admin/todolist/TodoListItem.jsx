import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

const TodoListItem = ({ id, type, date, todoItem }) => {
  const [isChecked, setIsChecked] = useState(type === "done");
  const [editableTodo, setEditableTodo] = useState(todoItem);
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = () => {
    setIsEditing(false);
    updateTodoItem();
  };

  const handleInputChange = (event) => {
    setEditableTodo(event.target.value);
  };

  const handleDeleteButtonClick = () => {
    deleteTodoItem();
  };

  const updateTodoItem = () => {
    try {
      const token = sessionStorage.getItem("userToken");

      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/todo/update/${id}`,
          {
            todo: editableTodo,
            date,
            done: isChecked,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("Todo updated:", res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodoItem = () => {
    try {
      const token = sessionStorage.getItem("userToken");

      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/todo/delete`,
          { id },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("Todo deleted:", res.data);
          // Implement any additional logic here after deletion if needed
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("userToken");

      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/todo/complete/${id}`,
          { done: isChecked },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, [isChecked]);

  return (
    <div className="flex items-center gap-5">
      <input
        type="checkbox"
        className={`h-4 w-4 ${type === "done" && "text-stone-500"}`}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div
        className={`flex justify-between w-full items-center ${
          type === "not done" && "gap-3"
        }`}
      >
        {isEditing ? (
          <>
            <input
              type="text"
              value={editableTodo}
              onChange={handleInputChange}
              className="text-stone-700 font-medium border border-stone-300 rounded px-2 py-1"
            />
            <button
              className=" bg-primary py-1 px-3 rounded font-medium text-white"
              onClick={handleSaveButtonClick}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p
              className={`${
                type === "done" && "line-through"
              } text-stone-700 font-medium text-lg w-[60%] whitespace-normal break-words`}
            >
              {todoItem}
            </p>
            <div className=" flex items-center gap-3">
              <p
                className={`${
                  type === "done" && "pl-1 line-through"
                } text-stone-600 font-medium text-xs mt-1`}
              >
                {moment(date).format("Do MMM")}
              </p>
              <div>
                <MdModeEditOutline
                  className="text-lg text-stone-800 mt-1 cursor-pointer"
                  onClick={handleEditButtonClick}
                />
              </div>
              <div>
                <MdDelete
                  className="text-lg text-stone-800 mt-1 cursor-pointer"
                  onClick={handleDeleteButtonClick}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoListItem;
