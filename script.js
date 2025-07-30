window.onload = () => {
      fetchItems()
}

// Open Modal Button
document.getElementById("OpneModelBtn").addEventListener("click",(e)=>{
      e.preventDefault()
      Swal.fire({
            html:`
                  <div class="flex flex-col w-full text-left gap-2">
                        <h1 class="font-semibold text-zinc-800">Enter Your Task</h1>
                        <form onSubmit="saveTask(event)" class="flex flex-col gap-2"> 
                              <Input id="inputValue" type="text" placeholder="Enter Your Task Here" class="px-2 outline-none focus:ring-2 rounded py-1 "/>
                              <input id="inputDate" type="date"/>
                              <button  class="bg-indigo-500 text-white rounded px-4 py-1 rounded w-fit">Submit</button>
                        </form>
                  </div>
            `,
            showConfirmButton:false
      })
})




// Save Data
const saveTask = (event) => {
      event.preventDefault()
      // Take Value
      const inpVal = document.getElementById("inputValue").value;
      const inpDateVal = document.getElementById("inputDate").value;
      const key = Date.now()

      if(!inpVal && !inpDateVal){
            alert("Please Fill Empty Fields")
            return false;
      }
  
      // Make Object
      const dataObj = JSON.stringify({
            task : inpVal,
            date : inpDateVal,
      })

      // Set In Local Storage
      localStorage.setItem(key,dataObj)
      Swal.fire({
            icon:"success",
            title:"Task Added"
      })
      location.href = location.href
}



// Fetch All Task
const fetchItems = () => {
      const taskKeys = Object.keys(localStorage)
      const tbody = document.getElementById("tbody")

      for( let key of taskKeys){
            // Fetch Object           
            const taskData = localStorage.getItem(key)
            const parsed = JSON.parse(taskData)

            const ui = `
                  <tr class="text-center border-b border-gray-300 font-semibold">
                        <td class="p-2">${parsed.task}</td>
                        <td>${parsed.date}</td>
                        <td>
                              <select onChange="statusHandler(this,${key})" class="border border-zinc-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ">
                                    <option class="hover:bg-indigo-500" ${parsed.status === "Sheduled" ? "selected" : "" } value="Sheduled">Sheduled</option>
                                    <option class="hover:bg-indigo-500" ${parsed.status === "Progress" ? "selected" : "" } value="Progress">Progress</option>
                                    <option class="hover:bg-indigo-500" ${parsed.status ===  "Complete" ? "selected" : ""} value="Complete">Complete</option>
                                    <option class="hover:bg-indigo-500" ${parsed.status === "Cancelled" ? "selected"  : "" } value="Cancelled">Cancelled</option>
                              </select>
                              <td>
                                    <button onClick='editTask("${key}", ${JSON.stringify(parsed)})' class="bg-green-500 text-white px-2 py-1 rounded shadow-md"><i class="ri-pencil-line"></i></button>
                                    <button onClick="deleteTask('${key}')" class="bg-red-500 text-white px-2 py-1 rounded shadow-md"><i class="ri-delete-bin-6-line"></i></button>
                              </td>
                        </td>
                  </tr>
            `

            tbody.innerHTML += ui   
      }
}




// Edit Task
const editTask = (key,data) => {
      Swal.fire({
            html:`
                  <div class="flex flex-col w-full text-left gap-2">
                        <h1 class="font-semibold text-zinc-800">Edit Your Task</h1>
                        <form onSubmit="updateTask(event,${key})" class="flex flex-col gap-2"> 
                              <Input value='${data.task}' id="editinputValue" type="text" placeholder="Enter Your Task Here" class="px-2 outline-none focus:ring-2 rounded py-1 "/>
                              <input value='${data.date}' id="editinputDate" type="date"/>
                              <button  class="bg-indigo-500 text-white rounded px-4 py-1 rounded w-fit">Upadte</button>
                        </form>
                  </div>
            `,
            showConfirmButton:false
      })
}



// Update Value
const updateTask = (event,key) => {
      event.preventDefault()
      const editVal = document.getElementById("editinputValue").value;
      const editDate  = document.getElementById("editinputDate").value;

      if(!editVal && !editDate){
            alert("Please Fill Empty Fields")
            return false;
      }

      const editObj = JSON.stringify({
            task : editVal,
            date : editDate
      })

      localStorage.setItem(key,editObj)
      Swal.fire({
            icon:"success",
            title:"Updated"
      })
      location.href = location.href
}



// Delete Task
const  deleteTask = (key) => {
      localStorage.removeItem(key)
      location.href = location.href
}



// Status Handler
const statusHandler = (event,key) => {
      const statusValue =  event.value;
      const statuskey = JSON.parse(localStorage.getItem(key))
      
      const statusObj = JSON.stringify({
            ...statuskey,
            status : statusValue
      })

      localStorage.setItem(key,statusObj)

}


// end 