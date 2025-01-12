// src/components/CartItem/index.jsx
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../redux/features/cartSlice";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item._id));
    idbPromise('cart', 'delete', { ...item });
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch(removeFromCart(item._id));
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch(updateCartQuantity({
        _id: item._id,
        purchaseQuantity: parseInt(value)
      }));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={handleQuantityChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={handleRemoveFromCart}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;