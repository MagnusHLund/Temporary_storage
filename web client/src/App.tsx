import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Navbar, { links } from './components/content/Navbar'
import TermsOfServiceSection from './components/sections/TermsOfServiceSection'
import UploadSection from './components/sections/UploadSection'
import DownloadSection from './components/sections/DownloadSection'
import NotFoundSection from './components/sections/NotFoundSection'
import NavbarLinks from './assets/component data/navbar.json'

function App() {
  const links: links = NavbarLinks

  return (
    <>
      <Navbar links={links} />
      <main>
        <Routes>
          <Route path="upload" element={<UploadSection />} />
          <Route path="download" element={<DownloadSection />} />
          <Route path="tos" element={<TermsOfServiceSection />} />
          <Route path="*" element={<NotFoundSection />} />
        </Routes>
      </main>
    </>
  )
}

export default App
