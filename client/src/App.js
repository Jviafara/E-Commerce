import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import OrderDetails from './pages/OrderDetails';
import OrderHistory from './pages/OrderHistory';
import PaymentMethod from './pages/PaymentMethod';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import ShippingAddress from './pages/ShippingAddress';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col  h-screen w-full">
                <Header />
                <main className="pt-8 my-8 mx-4 md:mx-[10%] xl:mx-[15%] h-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/product/slug/:slug"
                            element={<Product />}
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/shippingAddress"
                            element={<ShippingAddress />}
                        />
                        <Route
                            path="/payment-methods"
                            element={<PaymentMethod />}
                        />
                        <Route path="/place-order" element={<PlaceOrder />} />
                        <Route path="/order/:id" element={<OrderDetails />} />
                        <Route
                            path="/orders-history"
                            element={<OrderHistory />}
                        />
                        <Route path="/profile" element={<UserProfile />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
