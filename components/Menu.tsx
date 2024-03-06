"use client"
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
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
        icon: <GiHamburgerMenu style={{ color: '' }} className={''} />,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                        children: [
                            {
                                label: (
                                    <div className={'flex flex-col w-auto h-full'}>


                                        <div className={'flex space-x-5'}>
                                            <div className={'w-[80px] h-[80px] rounded-full bg-primaryColor'}>
                                                prod1
                                            </div>

                                            <div className={'w-[80px] h-[80px] rounded-full bg-primaryColor'}>
                                                prod2
                                            </div>
                                        </div>
                                    </div>
                                ),
                                key: 'setting:2',
                            },
                        ]
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
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
