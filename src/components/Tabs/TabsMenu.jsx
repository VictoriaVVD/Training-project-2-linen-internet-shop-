import { Tabs } from 'antd';
import "./style.scss";
import { ReviewsList } from '../Reviews/ReviewsList';


export const TabsMenu = ({product, setProduct}) => {

  const onChange = (key) => {
    console.log(key);
  };
  
  const items = [
    {
      key: '1',
      label: `Описание`,
      children: product.description,
    },
    {
      key: '2',
      label: `Характеристики`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `Отзывы`,
      children: <ReviewsList product={product} setProduct={setProduct}/>,
    },
  ];
  
  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} product={product} />
  )
  
};
