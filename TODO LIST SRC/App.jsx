// import { useState } from 'react';
// // import reactLogo from './assets/react.svg';
// // import viteLogo from '/vite.svg';
// // import './App.css';
// import Navbar from './components/navbar';
// import { v4 as uuidv4 } from 'uuid';

// function App() {
//   const [todo, setTodo] = useState("");
//   const [Todos, setTodos] = useState([]);

//   const handleEdit = (id) => {
//     // Implement edit logic here, possibly by setting an edit mode for the todo with the given id
//     console.log('Editing todo with id:', id);
//   };

//   const handleDelete = (id) => {
//     // Filter out the todo with the given id
//     // const updatedTodos = Todos.filter((item) => item.id !== id);
//     // setTodos(updatedTodos);
//     const id = e.target.name;
//     const index = Todos.findIndex((item) => item.id === id);
//   };

//   const handleAdd = () => {
//     setTodos([...Todos, { id: uuidv4(), todo, isCompleted: false }]);
//     setTodo("");
//   };

//   const handleChange = (e) => {
//     setTodo(e.target.value);
//   };

//   const handleCheckbox = (e) => {
//     const id = e.target.name;
//     const index = Todos.findIndex((item) => item.id === id);

//     const newTodos = [...Todos]; // Create a new array to avoid direct mutation
//     newTodos[index].isCompleted = !newTodos[index].isCompleted;
//     setTodos(newTodos);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto my-2 rounded-xl p-5 bg-emerald-300 p-3 min-h-[80vh] overflow-y-scroll ">
//         <div className="add-todo my-3">
//           <h2 className='text-lg font-bold'>Add your todo</h2>
//         </div>
//         <input onChange={handleChange} value={todo} className='p-2 py-1 rounded-lg hover:bg-slate-100 min-w-96' type="text" placeholder='enter your todo you want to add' />
//         <button onClick={handleAdd} className='bg-lime-400 hover:bg-slate-500 p-2 py-1 text-white rounded-lg mx-6 font-bold'>click to add</button>
//         <h2 className='text-xl font-bold text-white '>Your Todo-List </h2>
//         <div className="todos">
//           {Todos.map(item => {
//             return (
//               <div key={item.id} className="todo flex justify-between my-3">
//                 <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
//                 <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
//                 <div className="buttons">
//                   <button onClick={() => handleEdit(item.id)} className='bg-lime-400 hover:bg-slate-500 p-2 py-1 text-white rounded-lg mx-5 font-bold'>Edit</button>
//                   <button onClick={() => handleDelete(item.id)} className='bg-lime-400 hover:bg-slate-500 p-2 py-1 text-white rounded-lg mx-5 font-bold'>Delete</button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(Todos));
  }, [Todos]);

  const handleEdit = (id) => {
    const todoToEdit = Todos.find((item) => item.id === id);
    setTodo(todoToEdit.todo);
    setEditId(id);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const updatedTodos = Todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  const handleAdd = () => {
    if (isEditing) {
      const updatedTodos = Todos.map((item) => {
        if (item.id === editId) {
          return { ...item, todo };
        }
        return item;
      });
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
      setTodos([...Todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = Todos.findIndex((item) => item.id === id);

    const newTodos = [...Todos]; // Create a new array to avoid direct mutation
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Todo List</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={todo}
              onChange={handleChange}
              placeholder="Add a todo"
              className="flex-grow px-4 py-2 border rounded-md focus:outline-none"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              {isEditing ? 'Save' : 'Add'}
            </button>
          </div>
          <ul className="space-y-4">
            {Todos.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={handleCheckbox}
                    name={item.id}
                    className="mr-2"
                  />
                  <div className={`flex-grow ${item.isCompleted ? 'line-through' : ''}`}>
                    {isEditing && item.id === editId ? (
                      <input
                        type="text"
                        value={todo}
                        onChange={handleChange}
                        className="border rounded-md px-2 py-1"
                      />
                    ) : (
                      item.todo
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
