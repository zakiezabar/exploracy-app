// app/test-email/page.tsx
import TestEmailForm from './TestEmailForm';
import { Card } from '@/components/ui/card';

export default function TestEmailPage() {
  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Test Email Invitation</h1>
        <TestEmailForm />
      </Card>
    </div>
  );
}