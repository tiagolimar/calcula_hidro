export const Select = (props) => {
    return (
        <select
            id={props.id}
            className="form-select custom-select"
            onChange={props.onChange}
            value={props.value}
        >
            {props.children ? props.children : <option value="0">Selec</option>}
        </select>
    );
};
