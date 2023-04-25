import { useEffect, useState } from "react";
import axios from "axios";

import "./App.scss";
import ListItem from "./components/ListItem";

const baseURL = "https://tasklist-server.onrender.com/tasks";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(baseURL);
      setList([...list, ...response.data.map((el) => el)]);
    } catch (error) {
      console.log(error);
    }
  };

  const postTask = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(baseURL, {
        task: task,
      });
      setList((prev) => [...prev, response.data])
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(baseURL);
      setList([]);
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // const handleNewTask = (evt) => {
  //   evt.preventDefault();
  //   if (task === "") return;
  //   setList([...list, task]);
  //   setTask("");
  // };

  return (
    <div className="app">
      <h1>Task List</h1>
      <form action="">
        <label>
          Add a new task
          <input
            type="text"
            value={task}
            onChange={(evt) => setTask(evt.target.value)}
          />
        </label>
        <div className="buttonWrapper">
          <button onClick={postTask}>New task</button>
          <button onClick={handleDeleteAll}>Delete all</button>
        </div>
      </form>
      <div className="listWrapper">
        <ul>
          {list.map((el) => (
            <ListItem
              key={el["_id"]}
              id={el["_id"]}
              task={el.task}
              list={list}
              setList={setList}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
