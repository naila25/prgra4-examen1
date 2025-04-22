import { useEffect, useState } from 'react'
import './App.css'


interface Producto {
  nombre: string
  stock: boolean
  stockDate?: string

}
function App() {
  const [ProductoNombre, setProductoNombre] = useState('')
  const [productosList, setproductosList] = useState<Producto[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)


  useEffect(() => {
    const saved = localStorage.getItem('productosList')
    if (saved) {
      setproductosList(JSON.parse(saved)) // Convertimos el string a objeto
    }
  }, [])

  // Guarda las tareas en localStorage
  const saveToLocalStorage = (productosList: Producto[]) => {
    localStorage.setItem('productosList', JSON.stringify(productosList))
}




  const handleChange = (e: any) => {
    setProductoNombre(e.target.value)
  }


  const handleAddOrUpdate = () => {
    // Evita agregar tareas vacías
    if (ProductoNombre.trim() === '') return

    // Si hay una tarea en edición, se actualiza
    if (editingIndex !== null) {
      const updated = [...productosList]
      updated[editingIndex].nombre = ProductoNombre
      setproductosList(updated)
      saveToLocalStorage(updated)
      setEditingIndex(null) // Se sale del modo edición
    } else {
      // Si no hay edición, se agrega una nuevo producto
      const newProducto: Producto = {
        nombre: ProductoNombre,
        stock: false,
      }
      const updated = [newProducto, ...productosList] // Se coloca al principio de la lista
      setproductosList(updated)
      saveToLocalStorage(updated)
    }

    // Se limpia el input
    setProductoNombre('')
  }


  // Elimina una tarea por su índice
  const handleDelete = (index: number) => {
    const updated = productosList.filter((_, i) => i !== index)
    setproductosList(updated)
    saveToLocalStorage(updated)
    
}


  const startEditing = (index: number) => {
    setEditingIndex(index)
    setProductoNombre(productosList[index].nombre)
  }


  const cancelEdit = () => {
    setEditingIndex(null)
    setProductoNombre('')
}

const handleToggle = (index: number) => {
  const updated = [...productosList]
  const productos = updated[index]
  
  // Alterna entre completado y no completado
  productos.stock = !productos.stock
  productos.stockDate = productos.stock ? new Date().toLocaleString() : undefined

  // Se reorganiza la tarea según su estado
  updated.splice(index, 1)
  productos.stock ? updated.push(productos) : updated.unshift(productos)

  setproductosList(updated)
  saveToLocalStorage(updated)
  }



  return (
    <div style={{ border: '1px solid black', padding: '20px' }}>
      <h1>Inventario</h1>
      <div>
        <input style={{ marginRight: 10}} type='text' value={ProductoNombre} onChange={handleChange}
            placeholder='Nuevo producto' />

        {/* boton agregar y actualizar*/}
        <button onClick={handleAddOrUpdate}>
          {editingIndex !== null ? 'Actualizar' : 'Agregar'}
        </button>

        {/* Botón para cancelar la edición */}
        {editingIndex !== null && (
          <button onClick={cancelEdit} style={{ marginLeft: 8 }}>
            Cancelar
          </button>
        )}



      </div>
      <div>Products Here:</div>
      <ul > 
        
          {productosList.map((producto, index) => {
            return <li
            key={index}
            style={{
              background: producto.stock ? '#ffe6e6' : '#f2f2f2',
              color: '#333',
              padding: '10px',
              borderRadius: '8px',
              width: '30vw',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              transition: 'background 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={producto.stock}
                onChange={() => handleToggle(index)}
                style={{ marginRight: 12, transform: 'scale(1.2)' }}
              />
              <div>
                <div
                  style={{
                    fontWeight: 'bold',
                    textDecoration: producto.stock ? 'line-through' : 'none',
                  }}
                >


                  {producto.nombre}
                </div>
                {producto.stock && (
                  <div style={{ fontSize: '0.75em', color: '#888', marginTop: 2 }}>
                    Stock desde: <span style={{ fontStyle: 'italic' }}>{producto.stockDate}</span>
                  </div>
                )}
              </div>
            </div>
          
            <div>
              <button
                onClick={() => startEditing(index)}
                style={{
                  marginRight: 8,
                  padding: '6px 10px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(index)}
                style={{
                  padding: '6px 10px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
          
          })}

            
        </ul>
    </div>
  )
}

export default App











// const handleToggle = (index: number) => {
//   const updated = [...todos]
//   const todo = updated[index]
//   todo.completed = !todo.completed
//   todo.completedDate = todo.completed ? new Date().toLocaleString() : undefined

//   updated.splice(index, 1)
//   todo.completed ? updated.push(todo) : updated.unshift(todo)

//   setTodos(updated)
 
//   }






//   <div style={{ border: '1px solid blue', padding: 20, maxWidth: 500, margin: '0 auto' }}>
//     <h2>TODOs here:</h2>

//     {/* Campo de texto y botones para agregar o actualizar */}
//     <div style={{ marginBottom: 10 }}>
//       <input
//         type="text"
//         value={todoDescription}
//         onChange={handleChange}
//         style={{ marginRight: 10 }}
//       />
//       <button onClick={handleAddOrUpdate}>
//         {editingIndex !== null ? 'Actualizar' : 'Agregar'}
//       </button>

//       {/* Botón para cancelar la edición */}
//       {editingIndex !== null && (
//         <button onClick={cancelEdit} style={{ marginLeft: 8 }}>
//           Cancelar
//         </button>
//       )}
//     </div>

//     {/* Lista de tareas */}
//     <ul>
//       {todos.map((todo, index) => (
//         <li
//           key={index}
//           style={{
//             color: todo.completed ? 'red' : 'black', // Rojo si está completada
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: 8,
//           }}
//         >
//           <div style={{ flexGrow: 1 }}>
//             {/* Checkbox para marcar como completada */}
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => handleToggle(index)}
//               style={{ marginRight: 8 }}
//             />

//             {/* Texto de la tarea */}
//             {todo.description}

//             {/* Fecha de completado, si aplica */}
//             {todo.completed && (
//               <span style={{ marginLeft: 10, fontSize: '0.8em' }}>
//                 (Completado el {todo.completedDate})
//               </span>
//             )}
//           </div>

//           {/* Botones para editar o eliminar la tarea */}
//           <button onClick={() => startEditing(index)} style={{ marginLeft: 5 }}>
//             Editar
//           </button>

//           <button onClick={() => handleDelete(index)} style={{ marginLeft: 5 }}>
//             Eliminar
//           </button>
//         </li>
//       ))}
//     </ul>
//     </div>
//