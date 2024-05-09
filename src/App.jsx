
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Body from './components/Body/Body';
import Header from './components/Header/Header';
import PokemonDetails from './components/Body/Pokemon Details/PokemonDetails';
import Filter from "./components/filter/Filter"



function App() {
  const routes = createBrowserRouter([
    {
      path : "/",
      element : <> <Header /> <Filter /> <Body /> </>
    },
    {
      path : "/PokemonDetails/:id",
      element : <> <Header /> <PokemonDetails /> </>
    },
    
  ])
  return(
      <RouterProvider router={routes}/>
  )
}

export default App;
