import { useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { todoContext } from "../../contexts/todoContext";
import { toast ,Bounce} from "react-toastify";



const TodoForm = ()  => {
    const [ todoContent , setTodoContent ] = useState("") ;
    const { addTodo } = useContext(todoContext) ;
    
    
    const constructTodo = ( todoContent ) =>{
        const _id = uuidv4() ;
        const isComplete = false ;
        const  constructedTodo = {todoContent,_id,isComplete} ;

        return constructedTodo ;
    }


    const handleSubmitTodo = (todoContent) =>{

     toast(addTodo(constructTodo(todoContent)), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });

        setTodoContent("");

    } ;
    return (
        <form  className="flex">
            <input
                value={todoContent}
                onChange={(e)=>setTodoContent(e.target.value)}
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />
            <button type="button" onClick={()=>handleSubmitTodo(todoContent)} className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

