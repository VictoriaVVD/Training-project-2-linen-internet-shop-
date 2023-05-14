import { Tabs } from 'antd';

const timeOptions = {
  day: 'numeric',
  month: 'short', year: "numeric"
}

export const TabsMenu = ({product}) => {
  console.log(product.description);
  const onChange = (key) => {
    console.log(key);
  };
  const reviews = product.reviews?.map((e) => <div key={e._id}> 
    <div className='reviews__item' >
      <div className='reviews__author'>
          <span> {e.author.name}</span>
          <span className='reviews__date'> {new Date(e.created_at).toLocaleString('ru-RU', timeOptions)}</span>
      </div>
      <div className='reviews__rate'>{new Array(e?.rating ?? 1).fill('X')}</div>
      <div className='reviews__text'>{e.text}</div>
    </div>
    <div className='reviews__hr' /></div>
  )
  console.log(product);
  const items = [
    {
      key: '1',
      label: `Описание`,
      children: product.description,
    },
    {
      key: '2',
      label: `Информация`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `Отзывы`,
      children: reviews,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
  
};
