import { useEffect, useState } from "react"


export const Todolist = () => {


    const [inputValue, setInputValue] = useState("")
    const [tareas, setTareas] = useState([])

    const onInputChange = (e) => {
        setInputValue(e.target.value)

    }

    const handleKeyUp = (e) => {

        if (e.key === "Enter" && inputValue.trim() !== "") {
            crearTarea(inputValue.trim())
            setInputValue("")
        }
    }

    const eliminarTarea = async (id) => {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        })
        getTareasFromApi()


    }

    const crearTarea = async (tarea) => {
        const response = await fetch("https://playground.4geeks.com/todo/todos/user_paola", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                label: tarea,
                is_done: false
            })
        })
        const data = response.json()
        getTareasFromApi()

    }

    const getTareasFromApi = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/users/user_paola")
        if (!response.ok) {
            crearUsuario()
            return
        }
        const data = await response.json()
        setTareas(data.todos)

    }



    const borrarUsuario = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/users/user_paola", {
            method: "DELETE"
        })
        crearUsuario()

    }

    const crearUsuario = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/users/user_paola", {
            method: "POST"
        })
        const data = await response.json()
        getTareasFromApi()
    }

    useEffect(() => {
        getTareasFromApi();

    }, [])

    return (
        <>
            <div className="gran-contenedor">
                <h1 className="titulo-principal">LISTA DE TAREAS</h1>
                <label className="lista-tareas" htmlFor="name">Tareas:</label>
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
                            <span>{tarea.label}</span>

                            <button className="btn-outline-danger" onClick={() => eliminarTarea(tarea.id)}>
                                <i className="bi bi-journal" style={{ fontSize: "1rem", marginRight: "2px" }}></i> Eliminar
                            </button>

                        </div>
                    ))
                }


                <button className="btn" onClick={() => borrarUsuario()}>
                    <i className="bi bi-trash3-fill"></i>
                    <i className="animation"></i>BORRAR TODO<i className="animation"></i>
                </button>

            </div>
        </>

    )
}