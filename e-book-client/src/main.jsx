import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./components/Layout/RootLayout.jsx";
import Home from "./components/Home/Home.jsx";
import AllBooks from "./components/Allbooks/AllBooks.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Register from "./components/Register/Register.jsx";
import BookDetails from "./components/Home/BookDetails.jsx";
import MyBooks from "./components/Mybooks/MyBooks.jsx";
import PrivateRoute from "./components/privateRoute/PrivateRoute.jsx";
import SingleMyBook from "./components/Mybooks/SingleMyBook.jsx";
import ReadBook from "./components/Mybooks/ReadBook.jsx";
import AddBook from "./components/AddBook/AddBook.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allBooks",
        Component: AllBooks,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "bookDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/books/${params.id}`),
        Component: BookDetails,
      },
      {
        path: "mybooks",
        element: (
          <PrivateRoute>
            <MyBooks></MyBooks>
          </PrivateRoute>
        ),
      },

      {
        path: "addbook",
        element: <AddBook></AddBook>,
      },
    ],
  },
  {
    path: "/read/:bookId",
    element: 
      <PrivateRoute>
        <ReadBook></ReadBook>
      </PrivateRoute>
    
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
