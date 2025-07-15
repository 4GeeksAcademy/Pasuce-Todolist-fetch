import { useState } from "react"


export const Todolist = () => {


    const [inputValue, setInputValue] = useState("")
    const [tareas, setTareas] = useState([])

    const onInputChange = (e) => {
        setInputValue(e.target.value)

    }

    const handleKeyUp = (e) => {

        if (e.key === "Enter" && inputValue.trim() !== "") {
            setTareas([...tareas, inputValue.trim()])
            setInputValue("")
        }
    }

    const eliminar = (index) => {
        const nuevoArreglo = tareas.filter((tarea, i) => {
            return i !== index
        })

        setTareas(nuevoArreglo)

    }

    return (
        <>
            <div className="gran-contenedor">
                <h1>TAREAS</h1>
                <label className="form-label" htmlFor="name">LISTA DE TAREAS:</label>
                <input className="form-control"
                    name="name"
                    type="text"
                    value={inputValue}
                    onChange={onInputChange}
                    onKeyUp={handleKeyUp}
                />

                {
                    tareas.map((tarea, index) => (
                        <div key={index} className="tarea-item">
                            <span>{tarea}</span>
                            <span className="boton-eliminar" onClick={() => eliminar(index)}>❎</span>
                        </div>
                    ))
                }




            </div>
        </>

    )
}