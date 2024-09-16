import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";



function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [Showfinished, setShowfinished] = useState(true)

  useEffect(() => {
    const todostring = localStorage.getItem("todos");
    if (todostring) {
      const todos = JSON.parse(todostring);
      settodos(todos);
    }
  }, []);
 
  const saveToLS= (params)=>{
    localStorage.setItem("todos" , JSON.stringify(todos));
  }

  const toggleFinished= (e)=>{
      setShowfinished(!Showfinished);
  }
  const handle_edit = (e,id)=>{
      let t = todos.filter(i => i.id === id);
      settodo(t[0].todo);
      let newtodos = todos.filter(item=>{
        return item.id !== id;
      })
  
      settodos(newtodos);

      saveToLS();

  }
  const handle_delete = (e , id)=>{
   
    let newtodos = todos.filter(item=>{
      return item.id !== id;
    })

    settodos(newtodos);
    saveToLS();
  }

  const handle_change = (e)=>{
     settodo(e.target.value)
  }
  const handle_add = ()=>{
    settodos([...todos , {id: uuidv4() ,todo , isCompleted: false}])
    settodo("")
    saveToLS();
    
  }
  const handlecheckbox = (e)=>{
      let id = e.target.name;
      let indx = todos.findIndex(item=>{
        return item.id === id;
      })
      let newtodos = [...todos];
      newtodos[indx].isCompleted = !newtodos[indx].isCompleted;
      settodos(newtodos);
      saveToLS();
  }


  return (
    <>
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-blue-300 min-h-[80vh] md:max-w-[80vw] ">
        <h1 className='font-bold text-center text-4xl text-blue-900 underline'>Your Daily Quest</h1>
        <div className="addtodo my-4">
          <h2 className='font-bold text-lg'>Add a quest</h2>
          <input onChange={handle_change} value={todo}  type="text" className='w-1/2 rounded-md p-4 ' />
          <button onClick={handle_add} disabled={todo.length <3} className='bg-gray-800 hover:bg-blue-700 h-14 px-7 m-2 text-sm font-bold rounded-md text-white mx-2'>Add</button>
        </div>
        <input onChange={toggleFinished}type="checkbox" checked={Showfinished} /> Show Finished Tasks
        <h1 className='text-xl font-bold'>Todos</h1>
        <div className="todos">
          {todos.length ===0 && <div>No more todos left</div>}
          {todos.map(item=>{
          return (Showfinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/4 my-3 justify-between">
          <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          <div className="buttons flex h-full">
          <button onClick={(e)=>{handle_edit(e,item.id)}} className='bg-gray-800 hover:bg-blue-700 p-2 py-1 text-sm font-bold rounded-md text-white mx-1'><FaEdit /></button>
          <button onClick={(e)=>{handle_delete(e,item.id)}} className='bg-gray-800 hover:bg-blue-700 p-2 py-1 text-sm font-bold rounded-md text-white mx-1'><FaTrashAlt /></button>
          </div>
        </div>
        })}
      </div>
      </div>
    </>
  )
}

export default App
