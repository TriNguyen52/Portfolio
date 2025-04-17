import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "resume",
        element: <Resume />,
      },
      {
        path: "contact",
        element: <Contact />,
      }
    ]
  }
]);

export default router;