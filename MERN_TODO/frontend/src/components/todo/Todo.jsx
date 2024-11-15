import React, { useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });

  //This is array so the users added tasks are added into this array.
  const [Array, setArray] = useState([]);

  // Show Function
  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  // Change Function

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  // Submit Function

  // Usng this function after we click on submit the inputs are submitted and again Inputs(title and body) set to blank.

  const submit = () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or Body should not be Empty");
    } else {
      setArray([...Array, Inputs]);
      setInputs({ title: "", body: "" });
      toast.success("Your task is added");
      toast.error("Your task is added but not saved! Please SignUp");
    }
  };

  const del = (id) => {
    console.log(id);
    Array.splice(id, "1");
    setArray([...Array]);
    toast("Your task is deleted");
  };

  const dis = (value) => {
    console.log(value);
    document.getElementById("todo-update").style.display = value;
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-50 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              name="body"
              className="p-2 todo-inputs"
              value={Inputs.body}
              onChange={change}
            />
          </div>
          <div className="w-50 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array &&
                Array.map((item, index) => (
                  <div className="col-lg-3 col-10 mx-5 my-2">
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={index}
                      delid={del}
                      display={dis}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update  display={dis} />
        </div>
      </div>
    </>
  );
};

export default Todo;
