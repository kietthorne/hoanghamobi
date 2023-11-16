import React, { useEffect, useState } from 'react';
import { getDataProduct } from '../api/dataDrawFilter';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/fire";
import '../assets/less/AllProducts.css';
import AddProducts from '../components/AddProduct';
import { Link } from 'react-router-dom';



const AllProducts = ({ onAllProductsChange }) => {
    const [filter, setFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [editedTitle, setEditedTitle] = useState('');
    const [editedPrice, setEditedPrice] = useState('');
    const [editedThumbnail, setEditedThumbnail] = useState('');

    const [cartItems, setCartItems] = useState([]);



    const [showAddProduct, setShowAddProduct] = useState(false);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const handleDeleteProduct1 = (productId) => {
        const product = filteredProducts.find((product) => product.id === productId);
        setProductToDelete(product);
        setShowConfirmDialog(true);
    };
    const handleConfirmDelete = () => {
        // Xoá sản phẩm
        deleteProductFromLocalStorage(productToDelete.id);
        const updatedProducts = filteredProducts.filter((product) => product.id !== productToDelete.id);
        setFilteredProducts(updatedProducts);

        // Đóng hộp thoại xác nhận
        setShowConfirmDialog(false);
        setProductToDelete(null);
    };


    const handleAddToCart = (product) => {
        const storedData = localStorage.getItem('ProductsCart');
        let cartItems = [];

        if (storedData) {
            cartItems = JSON.parse(storedData);
        }

        cartItems.push(product);
        localStorage.setItem('ProductsCart', JSON.stringify(cartItems));

        setCartItems([...cartItems]);
    };


    const handleCancelDelete = () => {
        // Đóng hộp thoại xác nhận
        setShowConfirmDialog(false);
        setProductToDelete(null);
    };


    const deleteProductFromLocalStorage = (productId) => {
        const storedData = localStorage.getItem('ProductsTask');
        if (storedData) {
            const products = JSON.parse(storedData);
            const updatedProducts = products.filter((product) => product.id !== productId);
            localStorage.setItem('ProductsTask', JSON.stringify(updatedProducts));
        }
    };


    const handleDeleteProduct = (productId) => {
        const updatedProducts = filteredProducts.filter((product) => product.id !== productId);
        setFilteredProducts(updatedProducts);
        deleteProductFromLocalStorage(productId);
    };





    const handleAddProduct = () => {
        setShowAddProduct(true);
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoggedIn(!!currentUser?.email);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('ProductsTask');
        if (storedData) {
            localStorage.removeItem('ProductsTask');
        }

        const data = getDataProduct();
        localStorage.setItem('ProductsTask', JSON.stringify(data.products));
    }, []);

    const getAllProducts = () => {
        const storedData = localStorage.getItem('ProductsTask');
        if (storedData) {
            const products = JSON.parse(storedData);
            return products;
        }
        return [];
    };

    useEffect(() => {
        const allProducts = getAllProducts();
        setFilteredProducts(allProducts);
        const allBrands = [...new Set(allProducts.map((product) => product.brand))];
        setBrands(allBrands);
        if (typeof onAllProductsChange === 'function') {
            onAllProductsChange(allProducts);
        }
    }, [onAllProductsChange]);

    useEffect(() => {
        const allProducts = getAllProducts();
        let updatedFilteredProducts = allProducts;

        if (filter !== 'All') {
            updatedFilteredProducts = updatedFilteredProducts.filter((product) => product.category === filter);
        }

        if (brandFilter !== 'All') {
            updatedFilteredProducts = updatedFilteredProducts.filter((product) => product.brand === brandFilter);
        }

        setFilteredProducts(updatedFilteredProducts);
    }, [filter, brandFilter]);

    const handleCategoryFilter = (category) => {
        setFilter(category);
        setBrandFilter('All');
    };

    const handleBrandFilter = (brand) => {
        setBrandFilter(brand);
    };



    const openPopup = (productId, title, price, thumbnail) => {
        setSelectedProductId(productId);
        setEditedTitle(title);
        setEditedPrice(price);
        setEditedThumbnail(thumbnail);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();

        const updatedProducts = filteredProducts.map((product) => {
            if (product.id === selectedProductId) {
                return {
                    ...product,
                    title: editedTitle,
                    price: editedPrice,
                    thumbnail: editedThumbnail
                };
            }
            return product;
        });

        setFilteredProducts(updatedProducts);
        setShowPopup(false);
    };

    const renderProducts = () => {
        if (filteredProducts.length === 0) {
            return <p>Không có sản phẩm.</p>;
        }

        return (
            <div className='row'>
                {filteredProducts.map((product) => (
                    <div key={product.id} className='col-md-2  product-item'>
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="product-container">
                                <div className="fluid-box product-details">
                                    <img src={product.thumbnail} alt={product.id} className='img-fluid' />
                                    <h3>{product.title}</h3>
                                    <p>{product.price.toLocaleString()}</p>
                                </div>
                            </div>
                        </Link>

                        {isLoggedIn && user?.email === 'admin@hoangha.com' && (
                            <div className="btn-box">
                                <button className="btn btn-danger product-buttons" onClick={() => handleDeleteProduct1(product.id)}>Xoá</button>
                                <button className="btn btn-primary product-buttons" onClick={() => openPopup(product.id, product.title, product.price, product.thumbnail)}>Chỉnh Sửa</button>
                            </div>
                        )}

                        <button
                            className="btn btn-primary product-buttons"
                            onClick={() => handleAddToCart(product)}
                            style={{ display: user?.email === 'admin@hoangha.com' ? 'none' : 'block' }}
                        >
                            Thêm Vào Giỏ Hàng
                        </button>

                    </div>
                ))}
            </div>
        );
    };


    const renderBrandButtons = () => {
        let filteredBrands = brands;

        if (filter !== 'All') {
            const productsByCategory = getAllProducts().filter((product) => product.category === filter);
            const brandsByCategory = [...new Set(productsByCategory.map((product) => product.brand))];
            filteredBrands = filteredBrands.filter((brand) => brandsByCategory.includes(brand));
        }

        return (
            <div className='btn-group d-flex flex-wrap'>
                <button
                    className={`btn btn-secondary brand-btn btn-all ${brandFilter === 'All' ? 'active' : ''}`}
                    onClick={() => handleBrandFilter('All')}
                >
                    All Brands
                </button>
                {filteredBrands.map((brand) => (
                    <button
                        key={brand}
                        className={`btn btn-secondary brand-btn ${brandFilter === brand ? 'active' : ''}`}
                        onClick={() => handleBrandFilter(brand)}
                    >
                        {brand}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className='container'>

            {showConfirmDialog && (
                <div className="confirm-dialog-overlay">
                    <div className="confirm-dialog">
                        <h3>Bạn có thực sự muốn xoá không?</h3>
                        <div className="confirm-buttons">
                            <button className="btn btn-danger" onClick={handleConfirmDelete}>
                                Có
                            </button>
                            <button className="btn btn-secondary" onClick={handleCancelDelete}>
                                Không
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='btn-group'>


                <button type="button" className={`btn btn-primary category-btn ${filter === 'All' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('All')}>
                    Tất Cả Sản Phẩm
                    <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
                        {filteredProducts.length}
                        <span class="visually-hidden">unread messages</span>
                    </span>
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'smartphones' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('smartphones')}
                >
                    Điện Thoại
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'laptops' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('laptops')}
                >
                    Laptop
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'tablets' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('tablets')}
                >
                    Tablet
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'watches' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('watches')}
                >
                    Đồng Hồ
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'powerbanks' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('powerbanks')}
                >
                    Sạc Dự Phòng
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'mouses' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('mouses')}
                >
                    Chuột
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'docks' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('docks')}
                >
                    Dock Sạc
                </button>
            </div>
            <br />



            {renderBrandButtons()}
            {isLoggedIn && user?.email === 'admin@hoangha.com' && (
                <button className="btn btn-primary themsanpham" onClick={handleAddProduct}>Thêm Sản Phẩm Mới</button>
            )}
            <br />
            {renderProducts()}



            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Chỉnh Sửa Sản Phẩm</h2>
                        <form onSubmit={handleUpdateProduct}>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input type="text" id="title" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price:</label>
                                <input type="text" id="price" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="thumbnail">Thumbnail:</label>
                                <input type="text" id="thumbnail" value={editedThumbnail} onChange={(e) => setEditedThumbnail(e.target.value)} />
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="button" className="btn btn-secondary" onClick={closePopup}>Hủy</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {showAddProduct && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Thêm Sản Phẩm Mới</h2>
                        <AddProducts onClose={() => setShowAddProduct(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProducts;