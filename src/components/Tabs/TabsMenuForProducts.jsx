import { Tabs } from 'antd';
import "./style.scss";
import { ReviewsList } from '../Reviews/ReviewsList';


export const TabsMenuForProducts = ({product}) => {

    const onChange = (key) => {
    };

    const items = [
        {
            key: '1',
            label: `Описание`,
            children: <div dangerouslySetInnerHTML={{__html: product.description}}></div>,
        },
        {
            key: '2',
            label: `Характеристики`,
            children: ``,
        },
        {
            key: '3',
            label: `Отзывы`,
            children: <ReviewsList product={product} />,
        },  
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} className='tabs' />
    )
};
