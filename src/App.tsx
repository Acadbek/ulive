import { Route, Routes } from 'react-router-dom'
import SignIn from './_auth/forms/SignIn'
import SignUp from './_auth/forms/SignUp'
import Home from './_root/pages/Home'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import About from './_root/pages/About'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      {/* Private routes */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
