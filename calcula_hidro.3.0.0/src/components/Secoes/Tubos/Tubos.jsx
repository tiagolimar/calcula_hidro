import { Input } from "../../Input";
import { Secao } from "../../Secao";
import campos from "./campos.js";
import { Select } from "../../Select";

export const Tubos = () => {
    return (
        <Secao title="Tubos" size={3}>
            {Object.keys(campos).map((campo, id) =>
                campos[campo].tipo == "input" ? 
                    <Input
                        key={id}
                        title={campos[campo].nome}
                        // value={campos[campo].valor}
                        readOnly={campos[campo].soLer}
                    />
                    :
                    <Select
                        key={id}
                        title={campos[campo].nome}
                        dados={campos[campo].dados}
                        // value={campos[campo].valor}
                        readOnly={campos[campo].soLer}
                    />
            )}
        </Secao>
    );
};
