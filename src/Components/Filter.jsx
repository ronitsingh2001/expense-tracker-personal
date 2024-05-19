const Filter = () => {
  const mainFilterRef = useRef();
  const subFilterRef = useRef();

  const handleMainFilter = () => {
    setLoading(true);
    setMainFilterCurrent(mainFilterRef.current.value);
    let subFilterList = getSubFilter(mainFilterRef.current.value);
    setSubFilterCurrent("DEFAULT");
    setSubFilter(subFilterList?.map((e) => e.key));
    setExpense(subFilterList);
    setLoading(false);
  };

  const handleSubFilter = () => {
    setSubFilterCurrent(subFilterRef.current.value);
  };
  return (
    <>
      <h1 className="font-bold text-white ps-5">Filters</h1>
      <div className="filters-container gap-16 flex items-center justify-around  text-xs px-4">
        <select
          className="w-full md:max-w-[15rem] p-3 rounded-md focus:outline-none focus:ring-2 focus:bg-blue-950 bg-white/20 text-white capitalize"
          name="main-filter"
          value={mainFilterCurrent}
          onChange={handleMainFilter}
          ref={mainFilterRef}
        >
          {FILTER.map((x) => (
            <option
              className="bg-gray-700 text-white hover:bg-gray-600 capitalize"
              key={x}
              value={x}
            >
              {x}
            </option>
          ))}
        </select>
        <select
          className="w-full md:max-w-[15rem] p-3 rounded-md focus:outline-none focus:ring-2 focus:bg-blue-950 bg-white/20 text-white capitalize"
          name="sub-filter"
          defaultValue="DEFAULT"
          ref={subFilterRef}
          onChange={handleSubFilter}
        >
          <option value="DEFAULT">Show All</option>
          {!loading ? (
            subFilter?.map((x) => (
              <option
                className="bg-gray-700 text-white hover:bg-gray-600 capitalize"
                key={x}
                value={x}
              >
                {x}
              </option>
            ))
          ) : (
            <option className="text-white">Loading...</option>
          )}
        </select>
      </div>
      <hr className="mt-3 border-dotted" />
    </>
  );
};
export default Filter;