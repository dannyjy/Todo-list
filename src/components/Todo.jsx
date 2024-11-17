import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddTaskIcon from "@mui/icons-material/AddTask";
import "/src/styles/Todo.css"

function Card() {
  return (
    <div class="todo-app">
      <h1>To-do List</h1>

      <div class="input-section">
        <input type="text" placeholder="Enter Your Task..." className="inpt" />
        <button id="add-btn">
          <AddTaskIcon /> Add
        </button>
      </div>

      <div class="tasks-buttons">
        <button id="all-btn">
          <LibraryAddCheckIcon /> All
        </button>
        <button id="complete-btn">
          <LibraryAddCheckIcon /> Completed
        </button>
        <button id="trash-btn">
          <DeleteOutlineIcon /> Trash
        </button>
      </div>

      <ul id="task-list">
        <li class="task-item">
          <div class="task-content">
            <input type="checkbox" id="task1" />
            <label for="task1">This is the first task</label>
          </div>

          <button class="delete-btn">
            <DeleteOutlineIcon />
          </button>
        </li>

        <li class="task-item">
          <div class="task-content">
            <input type="checkbox" id="task2" />
            <label for="task2">Code at 2 PM</label>
          </div>
          <button class="delete-btn">
            <DeleteOutlineIcon />
          </button>
        </li>

        <li class="task-item">
          <div class="task-content">
            <input type="checkbox" id="task3" />
            <label for="task3">Code at 3 PM</label>7
          </div>
          <button class="delete-btn">
            <DeleteOutlineIcon />
          </button>
        </li>

        <li class="task-item">
          <div class="task-content">
            <input type="checkbox" id="task4" />
            <label for="task4">Code at 4 PM</label>
          </div>
          <button class="delete-btn">
            <DeleteOutlineIcon />
          </button>
        </li>
      </ul>

      <button id="clearbtn">CLEAR ALL</button>
    </div>
  );
}

export default Card;