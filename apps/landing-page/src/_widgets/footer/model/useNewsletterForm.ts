// _widgets/footer/model/useNewsletterForm.ts
'use client';

import { useCallback, useState } from 'react';

export function useNewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
      // TODO: conectar a un proveedor real (ej. Resend, Mailchimp, un
      // endpoint propio) — por ahora solo confirma visualmente.
      setSubmitted(true);
    },
    [email],
  );

  return { email, setEmail, submitted, handleSubmit };
}
