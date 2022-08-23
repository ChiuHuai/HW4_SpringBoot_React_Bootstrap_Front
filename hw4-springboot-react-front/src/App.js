import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./components/AddUser";
import NotFound from "./components/NotFound";
import UsersList from "./components/UsersList";

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* <Route index element = {<UsersList />} /> */}
          <Route path='/' element={<UsersList />} />
          <Route path='/add' element={<AddUser />} />
          <Route path='/user/edit/:id' element={<AddUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;