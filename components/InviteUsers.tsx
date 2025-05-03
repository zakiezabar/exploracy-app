// app/components/InviteUsers.tsx
'use client';

import { useState } from 'react';
import Input from '@/components/inputs/Input'; // adjust the import path as needed
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

interface InviteUsersProps {
  onEmailsChange: (emails: string[]) => void;
}

const InviteUsers = ({ onEmailsChange }: InviteUsersProps) => {
  const { register, formState: { errors } } = useForm();

  return (
    <div className="space-y-4">
      <Input
        id="inviteEmails"
        label="Invite Users"
        disabled={false}
        register={register}
        errors={errors}
        isEmailInput
        onEmailsChange={onEmailsChange}
      />
    </div>
  );
};

export default InviteUsers;