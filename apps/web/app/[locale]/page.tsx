import { redirect } from 'next/navigation';

export default function LocaleHome({ params }: { params: { locale: string } }) {
  // Redirect to dashboard with locale
  redirect(`/${params.locale}/dashboard`);
}

