import React from "react";
import "@google/model-viewer";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/Landing/page.tsx";
import Login from "./pages/Login/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.tsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.tsx";
import Packages from "./pages/Packages/Packages.tsx";
import SinglePackage from "./pages/Packages/id/SinglePackage.tsx";
import Dashboard from "./pages/Dashboard/Dashboad.tsx";
import Tickets from "./pages/Tickets/Tickets.tsx";
import SingleTicket from "./pages/Tickets/id/SingleTickets.tsx";
import CreateTicket from "./pages/Tickets/CreateTicket.tsx";
import {CartProvider} from "./context/CartContext.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Order from "./pages/Order/Order.tsx";
import Orders from "./pages/Orders/Orders.tsx";
import SingleOrder from "./pages/Orders/id/SingleOrder.tsx";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess.tsx";


const App: React.FC = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signUp" element={<SignUp/>}/>
                        <Route path="/resetPassword" element={<ResetPassword/>}/>
                        <Route path="/changePassword" element={<ChangePassword/>}/>
                        <Route path="/tickets" element={
                            <ProtectedRoute> <Tickets/> </ProtectedRoute>
                        }/>
                        <Route path="/tickets/:id" element={
                            <ProtectedRoute> <SingleTicket/> </ProtectedRoute>
                        }/>
                        <Route path="/tickets/create" element={
                            <ProtectedRoute> <CreateTicket/> </ProtectedRoute>
                        }/>
                        <Route path="/packages" element={<Packages/>}/>
                        <Route path="/packages/:id" element={<SinglePackage/>}/>
                        <Route
                            path="/dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>
                        }/>
                        <Route
                            path="/cart" element={<ProtectedRoute> <Cart/> </ProtectedRoute>}
                        />
                        <Route
                            path="/submitOrder" element={<ProtectedRoute> <Order/> </ProtectedRoute>}
                        />
                        <Route
                            path="/orderSubmitted" element={<ProtectedRoute> <OrderSuccess/> </ProtectedRoute>}
                        />
                        <Route
                            path="/orders" element={<ProtectedRoute> <Orders/> </ProtectedRoute>}
                        />
                        <Route path="/orders/:id" element={
                            <ProtectedRoute> <SingleOrder/> </ProtectedRoute>
                        }/>
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
