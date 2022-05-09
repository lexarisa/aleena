import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type ActiveLinkProps = {
  children: React.ReactNode;
  href: string; // 👈️ type children
};

const ActiveLink = ({ children, href }: ActiveLinkProps) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a className={`${router.pathname === href ? 'active' : 'links'}`}>
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
