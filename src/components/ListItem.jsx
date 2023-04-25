import React, { useState } from "react";
import trash from "../assets/trash.svg";
import pen from "../assets/pen.svg";
import axios from "axios";

export default function ListItem({ task, id, list, setList }) {
  const [edit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState("");

  const baseURL = "https://tasklist-server.onrender.com/tasks";

  const deleteTask = async () => {
    try {
      await axios.delete(baseURL + `/${id}`);
      setList(list.filter((el) => el["_id"] != id));
    } catch (error) {
      console.log(error);
    }
  };
  // const handleDelete = () => {
  //     const filteredList = list.filter((el)=>{
  //         return task != el;
  //     })
  //     setList(filteredList);
  // }

  const putTask = async () => {
    if (newTask !== "") {
      try {
        const response = await axios.put(baseURL + `/${id}`, {
          task: newTask,
        });
        const newList = list.map((el) => {
          if (el.task === task) return response.data;
          return el;
        });
        setList([...newList]);
        setNewTask("");
        setEdit(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //   const handleEdit = () => {
  //     if (newTask !== "") {
  //       const newList = list.map((el) => {
  //         if (el === task) return newTask;
  //         return el;
  //       });
  //       console.log({ newList });
  //       setList(newList);
  //       setNewTask("");
  //     }
  //     setEdit(false);
  //   };

  return (
    <>
      <li>
        {task}
        <div className="imageWrapper">
          <img src={pen} onClick={() => setEdit(true)} alt="" />
          <img src={trash} onClick={deleteTask} alt="" />
        </div>
      </li>
      {edit ? (
        <div className="editWrapper">
          <input
            value={newTask}
            onChange={(evt) => setNewTask(evt.target.value)}
            className="editTask"
          />
          <button onClick={putTask}>OK</button>
        </div>
      ) : null}
    </>
  );
}
