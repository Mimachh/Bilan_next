"use client";
import React from 'react'
import { Button } from '../ui/button';
import { useModal } from '@/providers/modal-provider';
import CustomModal from '../global/custom-modal';
import ContactForm from '../forms/contact-form';

const ContactButton = () => {
    const { data, setOpen: setOpenModal } = useModal();
    return (
        <Button
        variant={'primaryGradient'}
            onClick={() => {
                setOpenModal(
                    <CustomModal title="Nous contacter" subheading="Nous vous répondrons dans les plus brefs délais." >
                        <ContactForm />
                    </CustomModal>
                );
            }}
        >
            Nous contacter
        </Button>
    )
}

export default ContactButton