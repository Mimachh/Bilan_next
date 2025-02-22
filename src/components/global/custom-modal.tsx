'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useModal } from '@/providers/modal-provider'

type Props = {
  title: string
  subheading?: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const CustomModal = ({ children, defaultOpen, subheading, title }: Props) => {
  const { isOpen, setClose } = useModal()
  return (
    <Dialog
      open={isOpen || defaultOpen}
      onOpenChange={setClose}
    >
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          {subheading && (
            <DialogDescription className="text-neutral-500">
              {subheading}
            </DialogDescription>
          )}
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal