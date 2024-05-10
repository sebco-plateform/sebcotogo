import React, { useState } from 'react';
import { Modal, Space } from 'antd';
import {Button} from "@/components/ui/button";

interface ModalInterf {
    onclick: any;
}
const ModalConfirmAdmin: React.FC<ModalInterf> = (onclick) => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Space>
                <Button
                    variant="destructive"
                    size={'sm'}
                    onClick={() => {
                        Modal.warn({
                            title: 'Confirmation',
                            content: 'Voulez vous vraiment procesez à la supression?',
                            footer: (_, { OkBtn, CancelBtn }) => (
                                <>
                                    <Button variant={"destructive"}
                                            onClick={() => onclick}
                                    >
                                        Confirmer

                                    </Button>


                                    <CancelBtn />
                                    <OkBtn />
                                </>
                            ),
                        });
                    }}
                    className={''}
                >
                    Suprimer
                </Button>
            </Space>
            <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Button>Custom Button</Button>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default ModalConfirmAdmin;
