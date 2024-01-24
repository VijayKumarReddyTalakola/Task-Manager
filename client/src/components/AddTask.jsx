import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addTask } from "../redux/slice";
import { toast } from "react-hot-toast";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(Date.now());

  const handleAddTask = async () => {
    if(!title || !description) return toast.error("Please fill all fields")
    const response = await dispatch(addTask({ title, description, dueDate }));
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-x-none">
      <div className=" bg-white w-full rounded-lg shadow-xl border-t-2 overflow-hidden mx-auto max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
        <div className="w-full p-8 ">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            New Task
          </h2>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-200 text-gray-900 font-medium focus:outline-2 border border-gray-300 rounded py-2 px-4 block w-full"
              type="text"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-200 text-gray-900 overflow-y-auto font-medium resize-none focus:outline-2 border border-gray-300 rounded py-2 px-4 block w-full"
              type="text"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Due Date
            </label>
            <input
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-gray-200 text-gray-900 font-medium focus:outline-2 border border-gray-300 rounded py-2 px-4 block w-full"
              type="date"
            />
          </div>
          <div className="flex gap-x-4 mt-8  mx-auto justify-between">
            <Link to={`/`}>
              <button className="text-gray-800 bg-gray-200 border-2 border-black font-bold py-2 px-4 w-fit rounded">
                Cancel
              </button>
            </Link>
            <button
              onClick={handleAddTask}
              className="bg-gray-800 text-white font-bold py-2 px-4 w-fit rounded hover:bg-gray-700"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
