import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { filterTasks } from "../utils/filter";
import { toast } from "react-hot-toast";
import { deleteTask, getAllTasks, getFilteredTasks } from "../redux/slice";

const AllTasks = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(""); //stores start date
  const [endDate, setEndDate] = useState(""); //stores end date
  const [filteredDates, setfilteredDates] = useState({ start: "", end: "" }); // stores start and end dates after date filter is applied
  const [query, setQuery] = useState(""); //stores the query for search
  const [isFilter, setIsFilter] = useState(false); // stores the state of filter active based on date filtering
  const [filteredData, setFilteredData] = useState([]); // stores filtered data after applying  the date filter
  const [searchedTasks, setSearchedTasks] = useState([]); // stores searched data after applying the  search

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  const { tasks } = useSelector((state) => state["user"]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleFilter = async () => {
    if (startDate <= endDate) {
      setfilteredDates({ start: startDate, end: endDate });
      if (!startDate || !endDate) return toast.error("Please enter both dates");
      const response = await dispatch(getFilteredTasks({ startDate, endDate }));
      if (response.meta.requestStatus === "fulfilled") {
        const result = response.payload.tasks;
        setIsFilter(true);
        setFilteredData(result);
        if (query !== "") {
          setSearchedTasks(filterTasks(query, result));
          setFilteredTasks(filterTasks(query, result));
        } else {
          setFilteredTasks(result);
        }
        setStartDate("");
        setEndDate("");
      }
    } else {
      toast.error("Start Date must not exceed End Date");
    }
  };

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery === "") {
      if (isFilter) {
        setFilteredTasks(filteredData);
      } else {
        setFilteredTasks(tasks);
      }
      setSearchedTasks([]);
    } else {
      let filtered;
      if (isFilter) {
        filtered = filterTasks(newQuery, filteredData);
      } else {
        filtered = filterTasks(newQuery, tasks);
      }
      setFilteredTasks(filtered);
      setSearchedTasks(filtered);
    }
  };

  const clearFilters = async () => {
    setIsFilter(false);
    setQuery("");
    setStartDate("");
    setEndDate("");
    setfilteredDates({ start: "", end: "" });
    setFilteredData([]);
    setSearchedTasks([]);
    const response = await dispatch(getAllTasks());
    setFilteredTasks(response.payload.tasks);
  };

  return (
    <div className="w-full pt-20 lg:pt-24">
      <div className="w-full md:max-w-[95%] lg:max-w-[90%] flex justify-between items-center mx-auto px-3 md:px-0 ">
        <h1 className="text-2xl font-medium md:text-2xl">Your Tasks</h1>
        <Link to={"/task/new"}>
          <button className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg py-2 px-4">
            Add Task
          </button>
        </Link>
      </div>
      {tasks.length > 0 ? (
        <div className="w-full md:max-w-[95%] lg:max-w-[90%] px-5 md:px-0 flex flex-col mx-auto">
          <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
            <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-x-3 md:gap-x-1 lg:gap-x-3 sm:items-center w-full md:w-fit">
              <div className="flex items-center gap-1 lg:gap-2">
                <input
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white text-gray-600 font-medium rounded-lg focus:outline-none focus:shadow-outline border-2 border-gray-400 py-2 px-4 w-full sm:w-fit md:px-2 lg:px-4"
                  type="date"
                />
                <span className="font-semibold text-center ">To</span>
                <input
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white text-gray-600 font-medium rounded-lg focus:outline-none focus:shadow-outline border-2 border-gray-400 py-2 px-4 w-full sm:w-fit md:px-2 lg:px-4"
                  type="date"
                />
              </div>
              <div className="flex w-full gap-3 sm:gap-1 lg:gap-3 sm:w-fit justify-center">
                <button
                  onClick={handleFilter}
                  className="bg-blue-600 px-5 py-2 w-fit rounded-lg font-semibold text-white hover:bg-blue-800 md:px-3 lg:px-5 "
                >
                  Filter
                </button>
                <button
                  onClick={clearFilters}
                  className="bg-red-500 px-3 py-2 w-fit rounded-lg font-medium text-white hover:bg-red-600"
                >
                  Clear Filters
                </button>
              </div>
            </div>
            <div className=" py-2 md:py-4 w-full sm:w-fit">
              <input
                onChange={handleSearch}
                type="search"
                value={query}
                placeholder="Search Here"
                className="p-2 bg-white text-black border-2 w-full border-gray-400 focus:outline-none rounded-lg"
              />
            </div>
          </div>
          {query && (
            <h2 className="flex flex-wrap w-full text-xl mx-auto font-medium mb-2 ">
              Showing results for
              <span className=" ml-3 text-green-600 max-w-[90%] inline-flex break-all whitespace-pre-wrap ">
                {query}
              </span>
            </h2>
          )}
          {isFilter && (
            <h2 className="flex flex-wrap w-full text-xl mx-auto font-medium ">
              Showing results from
              <span className=" w-fit mx-3 text-green-600">
                {formatDate(filteredDates.start)}
              </span>
              to
              <span className=" w-fit text-green-600 ml-3">
                {formatDate(filteredDates.end)}
              </span>
            </h2>
          )}
          {filteredTasks.length > 0 ? (
            <div className="overflow-x-auto w-full flex justify-center items-center shadow-md sm:rounded-lg">
              <div className="w-full flex flex-col md:pt-2 ">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-base md:text-lg font-semibold tracking-wider text-gray-800"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-base md:text-lg font-semibold tracking-wider text-gray-800"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-base md:text-lg font-semibold tracking-wider text-gray-800"
                      >
                        Due Date
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-base md:text-lg font-semibold tracking-wider text-gray-800"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTasks?.map((task) => {
                      return (
                        <tr key={task._id}>
                          <td className="py-4 px-6 text-sm sm:text-base font-medium text-gray-600 whitespace-nowrap">
                            {task?.title}
                          </td>
                          <td className="py-4 px-6 text-sm sm:text-base font-medium text-gray-600 whitespace-nowrap">
                            {task?.description}
                          </td>
                          <td className="py-4 px-6 text-sm sm:text-base font-medium text-gray-600 whitespace-nowrap">
                            {formatDate(task?.dueDate)}
                          </td>
                          <td className="flex items-center gap-x-6 py-4 px-6 text-base font-medium ">
                            <Link
                              to={`/task/update/${task._id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </Link>
                            <MdDelete
                              onClick={() => dispatch(deleteTask(task._id))}
                              className="text-red-500 cursor-pointer hover:text-red-700"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className=" mt-5 text-red-500 flex h-[30vh] justify-center items-center text-xl mx-auto w-full font-semibold md:text-2xl">
              No Tasks Found
            </p>
          )}
        </div>
      ) : (
        <p className="flex min-h-[75vh] justify-center items-center text-xl mx-auto w-full font-semibold md:text-2xl">
          You haven&apos;t added any tasks
        </p>
      )}
    </div>
  );
};

export default AllTasks;
