const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <> 
 

        <input
        className="w-full p-2 bg-white border-2 border-palette-sdark outline-none placeholder-palette-slight rounded-xl"
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