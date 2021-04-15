import React from 'react'
import TextField from '@material-ui/core/TextField'

export default function InputSearch() {
    const [nombreUsuario, setName] = React.useState("");
    const cambioNombre = (evt) => {
        const newName = evt.target.value.replace(/[^a-zA-Z0-9\s]/, "");
        setName(newName);
    };
    return (
        <form>
            <TextField value={nombreUsuario} id="nombre" label="Buscar" variant="outlined" onChange={cambioNombre}
                inputProps={{ maxLength: 15 }} 
            style={{marginTop: 56, marginLeft: 10}}
                />
        </form>
    )
}