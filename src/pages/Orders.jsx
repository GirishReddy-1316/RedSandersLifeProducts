import React, { useEffect, useState } from 'react';
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../styles/orders.css";
import PagesHeader from '../components/PagesHeader.jsx';
import { axiosInstance, axiosInstanceWithToken } from '../api.js';
import { useSelector } from 'react-redux';

const Orders = () => {
    const isLogin = useSelector((state) => state.auth.isLoggedIn);
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState('');
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get(`/order/get-all?orderId=${orderId}`);
                setOrders(response.data);
            } catch (error) {
                console.log('Error fetching orders:', error);
            }
        };

        const fetchUserOrders = async () => {
            try {
                const response = await axiosInstanceWithToken.get(`/order/get`);
                setOrders(response.data);
            } catch (error) {
                console.log('Error fetching orders:', error);
            }
        };

        if (!isLogin) {
            fetchOrders();
        } else {
            fetchUserOrders()
        }

    }, [orderId, isLogin]);

    return (
        <div>
            <div className="orders-container">
                <PagesHeader />
                <h2 className='no-orders'>Orders</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by orderId..."
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                    />
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
