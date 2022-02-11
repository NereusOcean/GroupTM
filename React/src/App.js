
import './App.css';
import {LessonTable} from './pages/timetable';
import {Routes, Route, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">

        <Routes>
            <Route path='/lessons' element={<LessonTable/>}/>
        </Routes>
    </div>
  );
}

export default App;
