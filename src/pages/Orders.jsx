import React, { useEffect, useState } from 'react';
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../styles/orders.css";
import { axiosInstance } from '../api.js';
import { useSelector } from 'react-redux';
import { toast } from "sonner";
import CartPop from '../components/CartPop.jsx';
import Header from '../components/Header.jsx';
import Loader from "../components/Loader.jsx";


const Orders = () => {
    const { isLoggedIn, token } = useSelector((state) => state.auth);
    const { cartItems, wishItems } = useSelector(state => state.reducer);
    const [cartVisible, setCartVisible] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timerId;
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/order/get-all?orderId=${orderId}`);
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                setOrders([])
                console.log('Error fetching orders:', error);
                toast.error(
                    error.response ? error.response.data.message : error.message,
                    { duration: 2000, position: "top-center" }
                );
            }
            setLoading(false);
        };

        const fetchUserOrders = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/order/get`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching orders:', error);
                toast.error(
                    error.response ? error.response.data.message : error.message,
                    { duration: 2000, position: "top-center" }
                );
                setLoading(false);
            }
        };
        const handleDebounce = () => {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                if (orderId) {
                    fetchOrders();
                }
            }, 300);
        };

        if (isLoggedIn && token) {
            fetchUserOrders();
        } else {
            handleDebounce();
        }
        return () => {
            clearTimeout(timerId);
        };

    }, [orderId, isLoggedIn, token]);

    useEffect(() => {
        if (!isLoggedIn) {
            setOrders([]); // Clear orders when user logs out
        }
    }, [isLoggedIn]);

    return (
        <div>
     {loading && <Loader />}
            <div className="orders-container">
                {cartVisible && (
                    <CartPop
                        setCartVisible={setCartVisible}
                    />
                )}
                <div className="main-container">
                    <Header
                        cartCount={cartItems.length}
                        wishCount={wishItems.length}
                        setCartVisible={setCartVisible}
                    />
                </div>
                <h2 className='no-orders'>Orders</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by orderId..."
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                    />
                    <button>Search</button>
                </div>
                {orders.length === 0 ? (
                    <p className='no-orders'>No orders available</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Ordered When</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>
                                        {order.products.map((prod, index) => (
                                            <span key={index}>
                                                {prod.quantity}-{prod.productId.name} {index < order.products.length - 1 ? ", " : ""}
                                            </span>
                                        ))}
                                    </td>
                                    <td>{order.products.reduce((total, prod) => total + prod.quantity, 0)}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
            <BottomBar />
        </div>
    );
};

export default Orders;
