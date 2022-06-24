const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <> 
 

        <input
        className="w-full p-2 bg-gray-100 border border-purple-500 border-gray-200 rounded-lg"
            id="search"
            type="text"
            placeholder="Buscar por id"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        {
            
            filterText
                ?
                
                <button className={"text-blue-500"} onClick={onClear}>
                    &nbsp;&nbsp;Limpiar
                </button>
            :
                <></>
        }


    </>
);

export default FilterComponent