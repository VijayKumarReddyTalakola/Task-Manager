export const filterTasks = (query, tasks) => {
    if (!query) {
        return tasks;
    }
    const filteredData = tasks?.filter((item) =>
        item.title?.toLowerCase().includes(query?.toLowerCase()) ||
        item.description?.toLowerCase().includes(query?.toLowerCase())
    );
    return filteredData;
};