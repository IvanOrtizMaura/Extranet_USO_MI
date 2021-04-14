import React from 'react'
import TextField from '@material-ui/core/TextField'

export default function InputSearch() {
    const [name, setName] = React.useState("");
    const handleNameChange = (evt) => {
        const newName = evt.target.value.replace(/[^a-zA-Z0-9\s]/, "");
        setName(newName);
    };
    return (
        <form>
            <TextField value={name}id="outlined-basic" label="Buscar" variant="outlined" onChange={handleNameChange}
                inputProps={{ maxLength: 15 }} />
        </form>
    )
}