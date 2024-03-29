import { useEffect, useState } from "react";
import { getTaskDetails, updateTask } from "../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateTaskDetails = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(Date.now());

  useEffect(() => {
    dispatch(getTaskDetails({id}));
  }, []); 

  const { task } = useSelector((state) => state["user"]);

  useEffect(() => {
    if (task) {
      setTitle(task?.title || "");
      setDescription(task?.description || "");
      setDueDate(task?.dueDate || Date.now());
    }
  }, [task]);
   
  const handleupdateTask = async () => {
    const response = await dispatch(updateTask({ id, title, description, dueDate }));
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-x-none">
      <div className="bg-white w-full rounded-lg shadow-xl border-t-2 overflow-hidden mx-auto max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
        <div className="w-full p-8 ">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Update Task
          </h2>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-200 text-gray-900 font-medium focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
              type="text"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-200 text-gray-900 font-medium focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Due Date
            </label>
            <input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-gray-200 text-gray-900 font-medium focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
              type="date"
            />
          </div>
          <div className="flex gap-x-4 mt-8  mx-auto justify-between">
            <Link to={`/`}>
              <button className="text-gray-800 bg-gray-200 border-2 border-black font-bold py-2 px-4 w-fit rounded hover:bg-gray-800 hover:text-white">Cancel</button>
            </Link>
            <button onClick={handleupdateTask} className="bg-gray-800 text-white font-bold py-2 px-4 w-fit rounded hover:bg-gray-700">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskDetails;
