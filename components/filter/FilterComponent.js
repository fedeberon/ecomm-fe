const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <> 
 

        <input
        className="w-full"
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