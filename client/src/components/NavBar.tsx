import { AppBar, Button, Toolbar } from "@mui/material"
import { Link, Outlet } from "react-router-dom"

export const NavBar = () => {
    return (
        <>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit"component={Link} to={'/'}>Home</Button>
            <Button color="inherit"component={Link} to={'/graph'}>Graph</Button>
          </Toolbar>    
        </AppBar>
    
          <Outlet />
        </>
      )
}