"use client"
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Menu2 from "@/components/Menu2";
import { GiHamburgerMenu } from "react-icons/gi";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}


const items: MenuProps['items'] = [
    {
        label: 'Tous les catégories',
        key: 'SubMenu',
        icon: <GiHamburgerMenu style={{color: ''}} className={''}/>,
        children: [

            {
                label: 'Item 2',
                children: [
                    {
                        label: (
                            <div >
                                ca marcher
                            </div>
                        ),
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],

    }

];

const Menu1: React.FC = () => {
    const [current, setCurrent] = useState('');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
        />;
};

export default Menu1;
