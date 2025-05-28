import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useVLibras() {
    const location = useLocation();

    useEffect(() => {
        const existingScript = document.getElementById('vlibras-script');
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.id = 'vlibras-script';
        script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        script.async = true;
        script.onload = () => {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
        };

        document.body.appendChild(script);
    }, [location.pathname]); 
}
