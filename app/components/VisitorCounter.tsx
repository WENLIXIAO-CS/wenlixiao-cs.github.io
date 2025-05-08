'use client';

import { useEffect } from 'react';

export default function VisitorCounter() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'clstr_globe';
    script.src = '//clustrmaps.com/globe.js?d=mZ3CRYdt29GaKG_s7HwRjuO0B3KXDOfPkLQUeHkOFT0';
    document.body.appendChild(script);

    return () => {
      const scriptElement = document.getElementById('clstr_globe');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  return <div id="clstr_globe" />;
} 