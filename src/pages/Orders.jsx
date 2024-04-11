import React from 'react';
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../styles/orders.css";
import PagesHeader from '../components/PagesHeader.jsx';

const Orders = () => {
    // Sample data for orders
    const orders = [
        { id: 1, productName: 'Product A', quantity: 2, orderedWhen: '2024-03-15', status: 'Shipped' },
        { id: 2, productName: 'Product B', quantity: 1, orderedWhen: '2024-03-14', status: 'Processing' },
        { id: 3, productName: 'Product C', quantity: 3, orderedWhen: '2024-03-13', status: 'Delivered' }
    ];

    return (
      <div>
        <div className="orders-container">
           <PagesHeader />
            <h2 className='no-orders'>Orders</h2>
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
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.productName}</td>
                            <td>{order.quantity}</td>
                            <td>{order.orderedWhen}</td>
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

