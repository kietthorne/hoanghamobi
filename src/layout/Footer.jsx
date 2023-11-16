import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/less/footer.css"; // Import your custom CSS file
import { Link } from "react-router-dom";

function Footer() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const productsCart = JSON.parse(localStorage.getItem("ProductsCart")) || [];
    setProductCount(productsCart.length);

    const interval = setInterval(() => {
      const updatedProductsCart =
        JSON.parse(localStorage.getItem("ProductsCart")) || [];
      if (updatedProductsCart.length !== productCount) {
        setProductCount(updatedProductsCart.length);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [productCount]);

  return (
    <div className="container">
      <footer>
        <div className="container mx-auto pt-[150px] pb-[50px] ">
          <div className="bg flex justify-between ...">
            <div className="col-content">
              <div className="link-content">
                <span className="text-xl">
                  <a href="/">Hỗ trợ - Dịch vụ</a>
                </span>
                <ul>
                  <li>
                    <a href="/">Mua hàng trả góp</a>
                  </li>
                  <li>
                    <a href="/">Hướng dẫn đặt hàng và thanh toán</a>
                  </li>
                  <li>
                    <a href="/">Tra cứu đơn hàng</a>
                  </li>
                  <li>
                    <a href="/">Chính sách bảo hành</a>
                  </li>
                  <li>
                    <a href="/">Phạm vi điều khoản và bảo hành mở rộng</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="link-content">
              <span className="text-xl">
                <a href="/">Thông tin liên hệ</a>
              </span>
              <ul>
                <li>
                  <a href="/">Bán hàng online</a>
                </li>
                <li>
                  <a href="/">Chăm sóc khách hàng</a>
                </li>
                <li>
                  <a href="/">Dịch vụ sửa chữa Hoàng Hà Care</a>
                </li>
                <li>
                  <a href="/">Hợp tác kinh doanh</a>
                </li>
                <li>
                  <a href="/">Tra cứu bảo hành</a>
                </li>
              </ul>
            </div>
            <div className="link-content">
              <span className="text-lg">
                <a href="/">Hệ thống 127 siêu thị trên toàn quốc</a>
              </span>
              <ul>
                <li>
                  <a href="/">Danh sách siêu thị</a>
                </li>
              </ul>
            </div>
            <div className="link-content">
              <div className="text-lg">Tổng đài</div>
              <a href="tell:19002091" className="hotline">
                1900.2091
              </a>
            </div>
            <div>
              <span className="text-lg">Thanh toán miễn phí</span>
              <ul className="list-logo">
                <li>
                  <img src="../src./assets/icon/visa.svg" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <Link className="logo" to={"/cart"}>
        <div className="cart-container">
          <span style={{ color: "yellow", fontSize: "30px" }}>
            {productCount}
          </span>

          {/* Icon giỏ hàng */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32 "
            height="32"
            fill="white"
            className="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </div>
      </Link>
    </div>
  );
}

export default Footer;
