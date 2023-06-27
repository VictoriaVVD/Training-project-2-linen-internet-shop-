import "./style.scss";
import { CartItem } from "../../components/CartItem/CartItem";
import { GoBack } from "../../components/GoBack/GoBack";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../../store/slices/productCartSlice";
import { openNotification } from "../../components/Notification/Notification";

export const CartPage = () => {

    const {cart} = useSelector(s => s.cart);
    const dispatch = useDispatch();
    const price = cart.reduce((accum, item) => accum + item.product.price * item.quantity, 0);
    const discount = cart.reduce((accum, item) => accum + (item.product.price * item.product.discount / 100) * item.quantity, 0);
    const total = price - discount;

    const getTotalQuantity = () => {
        let total = 0;
        if (!!cart) {
            cart.forEach(e => 
                total += e.quantity
            )
        }
        return total;
    }
    const sendData = () => {
        dispatch(clearCart());
        openNotification("success", "Заказ оформлен");
        
    }

    return (
            <div className="cart">
                <div className="cart__wrapper">
                    <GoBack />
                    <div className="cart__block">
                        <div className="cart__list">
                            <h3>В корзине {getTotalQuantity()} товаров</h3>
                            {!!getTotalQuantity() &&
                                <div className="cart__list_caption">
                                    <span>Товар</span>
                                    <span>Наименование</span>
                                    <span>Цена</span>
                                    <span>Скидка</span>
                                    <span>Количество</span>
                                    <span>Итого</span>
                                </div>
                            }
                            {cart.map(e => 
                                <CartItem 
                                    product={e.product}
                                    quantity={e.quantity}
                                    key={e.product._id}
                                />
                            )}

                        </div>
                        <div className="cart__info">
                            <div className="cart__total">
                                <table className="cart__total_table">
                                    <caption>Товары в корзине</caption>
                                    <tbody>
                                        <tr>
                                            <td>Товары</td>
                                            <td>{price}&nbsp;₽</td>
                                        </tr>
                                        <tr>
                                            <td>Скидка</td>
                                            <td>{discount}&nbsp;₽</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Общая стоимость</strong></td>
                                            <td><strong>{total}&nbsp;₽</strong></td>
                                        </tr>
                                        {total >= 15000 &&
                                            <tr className="cart__total_table">
                                                <td>Бесплатная доставка</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                                {cart.length !== 0
                                ? <button onClick={sendData}>Оформить заказ</button>
                                : <button>Корзина пуста</button>
                                }
                            </div>
                        </div>

                    </div>
                    {!cart.length && 
                        <Link to={"/catalog"} className="cart__list_empty">
                            За покупками   
                        </Link>
                    }
                </div>
            </div>
    )
}