import "./style.scss";
import { CartItem } from "../../components/CartItem/CartItem";
import { GoBack } from "../../components/GoBack/GoBack";
import { CardList } from "../../components/CardList/CardList";
import { useSelector } from "react-redux";

export const CartPage = () => {

    const {cart} = useSelector(s => s.cart);
    const {products} = useSelector(s => s.products);
    console.log(products);
    const productsPopular = products.slice(0, 4);
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

    return (
            <div className="cart">
                <div className="cart__wrapper">
                    <GoBack />
                    <div className="cart__block">
                        <div className="cart__list">
                            <h3>В корзине {getTotalQuantity()} товаров</h3>
                            {!!getTotalQuantity() &&
                                <div className="cart__list_caption">
                                    <span>Карточка товара</span>
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
                                    </tbody>
                                </table>
                                {cart.length !== 0
                                ? <button>Оформить заказ</button>
                                : <button>Корзина пуста</button>
                                }
                            </div>
                            <div className="cart__info_delivery"></div>
                        </div>

                    </div>
                    {/* <div className="cart__block">
                        <h2>Популярные товары</h2>
                        <CardList cards={productsPopular} />
                    </div> */}
                </div>

            </div>
    )
}