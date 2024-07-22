import  ResponsiveAppBar from '../components/AppBar';
import { Outlet } from "react-router-dom";
import '../App.css'

function Root() {

  return (
    <>
      <ResponsiveAppBar/>
      <Outlet/>
    </>
  )
}

export default Root
