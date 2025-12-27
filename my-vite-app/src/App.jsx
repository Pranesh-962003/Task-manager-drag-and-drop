import React, { useState } from 'react'

const App = () => {
  const [coloumns, setColoumns] = useState({
    todo:{
      Name:"To Do",
      items:[
        {id:"1",content:"SAmple One"},
        {id:"2",content:"SAmple Two"}
      ]
    },
    progress:{
      Name:"In Progress",
      items:[
        {id:"3",content:"sample three"},
      ]
    },
    done:{
      Name:"Done",
      items:[
        {id:"4",content:"Sample Four"}
      ]
    }
  });

  const [newTask, setNewTask] = useState("")
  const [activeColoumns, setNewActiveColoumns] = useState("todo")
  const [draggedItem, setDraggedItem] = useState(null);


  const addNewTask = () =>{
    if(newTask.trim() === "") return;

    const updatedColoumns = {...coloumns}
    updatedColoumns[activeColoumns].items.push({
      id:Date.now().toString(),
      content:newTask
    })

    setColoumns(updatedColoumns);
    setNewTask('')

  }


  const removeTask = (coloumnId, taskId) =>{
    const updatedColoumns = {...coloumns}
    updatedColoumns[coloumnId].items = updatedColoumns[coloumnId].items.filter((item) => item.id !== taskId);
    setColoumns(updatedColoumns);

  }

  const HandleDragStart = (coloumnId, item) =>{
    setDraggedItem({coloumnId, item});
  };

  const HandleDrageOver = (e) =>{
    e.preventDefault();


  }

  const HandleDrop = (e, coloumnId) =>{
    e.preventDefault();
    if(!draggedItem) return;
    const {coloumnId: sourceColoumnId, item} = draggedItem;

    if(sourceColoumnId === coloumnId) return;

    const updatedColoumns = {...coloumns};

    updatedColoumns[sourceColoumnId].items = updatedColoumns[sourceColoumnId].items.filter((i)=> i.id != item.id);


    updatedColoumns[coloumnId].items.push(item)
    setColoumns(updatedColoumns);
    setDraggedItem(null)
  }

  const coloumnStyle = {
    todo:{
      header:"bg-gradient-to-r from-blue-600 to-blue-300",
      border:"border-blue-400"
    },
    progress:{
      header:"bg-gradient-to-r from-yellow-600 to-yellow-300",
      border:"border-yellow-400"
    },
    done:{
       header:"bg-gradient-to-r from-red-600 to-red-300",
      border:"border-red-400"
    }
  }

  return (
    <div className='p-6 w-full min-h-screen bg-linear-to-b from-zinc-900 to-zinc-700 flex items-center justify-center'>
      <div className='flex items-center justify-center flex-col gap-4 w-full max-e-6xl'>
        <h1 className='text-6xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-r from-white via-rose-300 to-gray-500'>React Kanban Board</h1>

        <div className='flex mb-8 w-full max-w-lg shadow-lg rounded-lg overflow-hidden'>
          <input type="text" value={newTask} 
          onChange={(e)=>setNewTask(e.target.value)}
          placeholder='Add new Task Here!.....'
          className='flex-2 p-3 bg-zinc-700 text-white' 
          onKeyDown={(e)=> e.key === "Enter" && addNewTask()}
          />

          <select value={activeColoumns}
          onChange={(e)=> setNewActiveColoumns(e.target.value)}
          className='p-3 bg-zinc-700 text-white  border border-zinc-600'
          >
            {Object.keys(coloumns).map((coloumnId)=>(
              <option value={coloumnId} key={coloumnId}>
                {coloumns[coloumnId].Name}
              </option>
            ))}

          </select>

          <button
          onClick={addNewTask}
           className='px-6 bg-linear-to-r from-rose-400 to-white font-bold hover:from-rose-600 hover:to-white cursor-pointer duration-200 transition-all hover:scale-103'>Add + </button>
        </div>

        <div className='flex gap-6 overflow-x-auto pb-6 w-full justify-center'>
            {Object.keys(coloumns).map((coloumnId)=>(
              <div key={coloumnId}
              className={`shrink-0 w-80 bg-zinc-800 rounded-lg shadow-xl  border-t-4 ${coloumnStyle[coloumnId].border}`}
              onDragOver={(e)=>HandleDrageOver(e, coloumnId)}
              onDrop={(e)=>HandleDrop(e, coloumnId)}
              >
                <div className={`p-4 text-white font-bold text-xl rounded-t-md ${coloumnStyle[coloumnId].header}`}>
                  {coloumns[coloumnId].Name}
                  <span className='ml-2 px-2 py-1 bg-zinc-800 bg-opacity-30 rounded-full text-sm'>{coloumns[coloumnId].items.length}</span>
                </div>

                <div className='p-3 min-h-64 '>
                  {coloumns[coloumnId].items.length === 0 ?(
                    <div className='text-center py-10 text-zinc-500 italic text-sm'>Drop your tasks here</div>
                  ):(
                    coloumns[coloumnId].items.map((item)=>(
                      <div key={item.id} className='p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md cursor-pointer flex items-center justify-between transform transition-all duration-200 hover:scale-105 hover:shadow-lg' draggable onDragStart={()=>HandleDragStart(coloumnId, item)}>
                        <span className='mr-2'>{item.content}</span>
                        <button onClick={()=>removeTask(coloumnId, item.id)} className='text-zinc-400 hover:text-red-400 transition-colors duration-200 w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-600'><span className='text-lg cursor-pointer'>x</span></button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
        </div>

      </div>

    </div>
  )
}

export default App