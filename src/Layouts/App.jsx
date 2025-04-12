import React, { useContext } from 'react';
import IndexSiswa from '../pages/Siswas/IndexSiswa';
import Navigation from '../components/navigation';
import CreateSiswa from '../pages/Siswas/CreateSiswa';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexHobby from '../pages/Hobbies/IndexHobby';
import CreateHobbies from '../pages/Hobbies/CreateHobby';
import EditHobby from '../pages/Hobbies/EditHobby';
import EditSiswa from '../pages/Siswas/EditSiswa';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import { AppContext } from '../Context/AppContext';


export default function App() {

  const {token} = useContext(AppContext);
  
  return (
    <React.StrictMode>
      <BrowserRouter
       future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
      >
        {
          token ? (
            <>
          <Navigation />
              <Routes>
                <Route path="/" element={<IndexSiswa/>} />
                <Route path="/siswa" element={<IndexSiswa />} />
                <Route path='/siswa/create' element={<CreateSiswa/>} />
                <Route path='/siswa/edit/:id' element={<EditSiswa/>} />
                <Route path='/hobby' element={<IndexHobby/>} />
                <Route path='/hobby/create' element={<CreateHobbies/>} />
                <Route path='/hobby/edit/:id' element={<EditHobby/>} />
              </Routes>
            </>
          ) :
          (
            <>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            </>
          )
        }
      </BrowserRouter>
    </React.StrictMode>
  )
}

