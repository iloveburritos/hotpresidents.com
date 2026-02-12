import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Custom404 = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h3 className="mt-20">404 - Page Not Found</h3>
            <Image className="mt-10" src="/static/notus.webp" alt="Notus" width="600" height="600"/>
            
            <h2 className="mt-20"><Link href="/">Head back home 👉</Link></h2>
        </div>
    );
};

export default Custom404;
