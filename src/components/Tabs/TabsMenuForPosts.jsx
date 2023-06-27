import { Tabs } from 'antd';
import "./style.scss";
import { CommentsList } from '../CommentsList/CommentsList';

export const TabsMenuForPosts = ({post}) => {

  const onChange = (key) => {
  };
  
  const items = [
    {
      key: '1',
      label: `Комментарии`,
      children: <CommentsList post={post} />,
    },
  ];
  
  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} className='tabs' />
  )
  
};
