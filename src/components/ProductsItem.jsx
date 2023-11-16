import { Link } from "react-router-dom";

export default function ProductsItem({ item, onDelete, onUpdate }) {
  return (
    <div className="product-item">
      <Link to={`/product/${item.id}`}>
        <div className="ribbon ribbon-top-left">
          <span>{Math.floor(item.discountPercentage)}%</span>
        </div>
        <div className="wrapper-thumb">
          <img className="thumb" src={item?.thumbnail} alt={item.title} />
        </div>
        <div className="info">
          <div className="title" title={item.description}>
            {item.title}
          </div>
          <div className="prices">
            <del className="price-root">
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
              }).format(item?.price)}
            </del>
            <span className="price-pro">
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
              }).format(
                Math.floor((item?.price * 100) / item?.discountPercentage)
              )}
            </span>
          </div>
          <div className="options">
            <button className="btn btn-primary btn-sm" onClick={(e) => {
               e.preventDefault()
               onDelete(item.id)
               }}>
              Remove
            </button>
            <button className="btn btn-warning btn-sm" onClick={(e) => {
               e.preventDefault()
               onUpdate(item)
               }}>
              Update
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
