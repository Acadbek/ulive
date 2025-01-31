import { Route, Routes } from 'react-router-dom'
import SignIn from './_auth/forms/SignIn'
import SignUp from './_auth/forms/SignUp'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import About from './_root/pages/About'
import Home from './_root/pages/home'
import ExplorePage from './_root/pages/explore'
import NotFoundPage from './_root/pages/404'
import PeoplePage from './_root/pages/people'
import SavedPage from './_root/pages/saved'
import CreatePost from './_root/pages/create-post'

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
        <Route index path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/people' element={<PeoplePage />} />
        <Route path='/saved' element={<SavedPage />} />
        <Route path='/create-post' element={<CreatePost />} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
