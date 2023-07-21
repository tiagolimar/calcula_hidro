export const InputForm = (props) => {
  return (
    <div className="col">
        <label forHTML="quantidade" className="legivel">Nº</label>
        <input type="number" value="1" step="1" min="1" id={props.id} className="form-control" />
    </div>
  )
}
