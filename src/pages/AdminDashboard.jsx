
import React, { useState, useEffect } from 'react';
import "../styles/adminDashboard.css";
import AdminData from '../data/AdminData';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); // Change this value to adjust the number of orders per page
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    // Fetch orders data from API or mock data
    // Replace this with your actual API call or data fetching logic
    setOrders(AdminData);

  }, []);

  // Sort orders based on the selected field
  const sortedOrders = () => {
    if (!sortedField) return orders;

    return [...orders].sort((a, b) => {
      const valueA = a[sortedField];
      const valueB = b[sortedField];

      if (valueA < valueB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders().slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Handle sorting
  const handleSort = field => {
    if (field === sortedField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedField(field);
      setSortDirection('asc');
    }
  };

  // Handle search
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='adminDashboard'>
      <h2>Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Search by Customer Email"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('orderId')}>Order ID</th>
            <th onClick={() => handleSort('customerEmail')}>Customer Email</th>
            <th onClick={() => handleSort('orderedWhen')}>Ordered When</th>
            <th onClick={() => handleSort('expectedDelivery')}>Expected Delivery</th>
            <th onClick={() => handleSort('deliveryAddress')}>Delivery Address</th>
            <th onClick={() => handleSort('deliveryPin')}>Delivery Pin</th>
            <th onClick={() => handleSort('costOfOrder')}>Cost of Order</th>
            <th onClick={() => handleSort('quantity')}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders
            .filter(order =>
              order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((order, index) => (
              <tr key={order.id}>
                <td>{order.orderId}</td>
                <td>{order.customerEmail}</td>
                <td>{order.orderedWhen}</td>
                <td>{order.expectedDelivery}</td>
                <td>{order.deliveryAddress}</td>
                <td>{order.deliveryPin}</td>
                <td>{order.costOfOrder}</td>
                <td>{order.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        ordersPerPage={ordersPerPage}
        totalOrders={orders.length}
        paginate={paginate}
      />
      <p>Total Number of Orders: {orders.length}</p>
    </div>
  );
};

const Pagination = ({ ordersPerPage, totalOrders, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default AdminDashboard;