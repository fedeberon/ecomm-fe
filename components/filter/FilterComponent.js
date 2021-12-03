const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <input
            id="search"
            type="text"
            placeholder="Buscar por id"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <button type="button" onClick={onClear}>
            X
        </button>
    </>
);

export default FilterComponent