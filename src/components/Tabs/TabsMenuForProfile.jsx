import { Tabs } from 'antd';
import "./style.scss";
import { UserInfoForm } from '../Forms/UserInfoForm';
import { UserProfilePosts } from '../UserProfileSections/UserProfilePosts';
import { UserProfileProducts } from '../UserProfileSections/UserProfileProducts';
import { EchartsPage } from '../../pages/EchartsPage/EchartsPage';


export const TabsMenuForProfile = ({product}) => {
  
  const onChange = (key) => {
  };
  
  const items = [
    {
      key: '1',
      label: `Профиль`,
      children: <UserInfoForm />
    },
    {
        key: '2',
        label: `Мои товары`,
        children:  <UserProfileProducts />         
    },
    {
        key: '3',
        label: `Мои статьи`,
        children: <UserProfilePosts />           
    },
    {
      key: '4',
      label: `Статистика`,
      children: <EchartsPage />           
  },
  ];

  
  return (
    <Tabs items={items} onChange={onChange} className='tabs' />
  )
  
};
