import React from 'react';
import IndexSiswa from '../pages/Siswas/IndexSiswa';
import Navigation from '../components/navigation';
import CreateSiswa from '../pages/Siswas/CreateSiswa';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexHobby from '../pages/Hobbies/IndexHobby';
import CreateHobbies from '../pages/Hobbies/CreateHobby';


export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter
       future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
      >
          <Navigation />
          
              <Routes>
                <Route path="/" element={<IndexSiswa/>} />
                <Route path="/siswa" element={<IndexSiswa />} />
                <Route path='/siswa/create' element={<CreateSiswa/>} />
                <Route path='/hobby' element={<IndexHobby/>} />
                <Route path='/hobby/create' element={<CreateHobbies/>} />
                
              </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}

