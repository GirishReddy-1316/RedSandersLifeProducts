import "../styles/cartpop.css";
import deleteImg from "../assets/delete.svg";
import { removeFromCart, updateCartItemQuantity } from "../redux/action/actions";
import { useDispatch } from "react-redux";

function CartProduct({ item, id }) {
  const { image, name, price, size, quantity } = item;
  const dispatch = useDispatch();

  const handleQuantityChange = (qnty) => {
    dispatch(updateCartItemQuantity(id, qnty))
  };

  const handleDelete = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="popup-product-card">
      <div className="card-top">
        <img src={image} alt={name} />
        <div className="popup-product-details">
          <h3>{name}</h3>
          <p>{size}</p>
          <div className="popup-counter">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <p>{quantity}</p>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        </div>
      </div>
      <div className="price-delete">
        <p>₹{(parseFloat(price.substring(1)) * quantity).toFixed(2)}</p>
        <img src={deleteImg} onClick={handleDelete} />
      </div>
    </div>
  );
}

export default CartProduct;
