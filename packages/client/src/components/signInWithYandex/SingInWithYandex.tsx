import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon';
import { OAuthAPI } from "../../api/OAuthApi";
import { useAuth } from "../../context/AuthContext";

const redirectUri = window.location.origin;

const getFeatures = () => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    return `width=${width},height=${height},left=${left},top=${top}`
}

export function SingInWithYandex() {
    const auth = useAuth()
    const [externalPopup, setExternalPopup] = useState<Window | null>(null);

    const connectClick = async () => {
        const res = await OAuthAPI.getServiceId(redirectUri);
        const clientID = res.data.service_id;
        const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}`;
        const features = getFeatures();
        const popup = window.open(url, '', features);
        setExternalPopup(popup);
    }

    useEffect(() => {
            if (!externalPopup) {
                return;
            }

            const timer = setInterval(() => {
                if (!externalPopup) {
                    timer && clearInterval(timer);
                    return;
                }
                const currentUrl: string = externalPopup.location.href;
                if (!currentUrl) {
                    return;
                }
                const searchParams: URLSearchParams = new URL(currentUrl).searchParams;
                const code = searchParams.get('code');
                if (code) {
                    externalPopup.close();
                    const data = {
                        code: code,
                        redirect_uri: redirectUri
                    }
                    OAuthAPI.signInWithYandex(data).then(() => {
                        auth.signInWithYandex.action();
                    })
                    .catch(() => {
                        auth.signInWithYandex.error;
                    })
                    .finally(() => {
                        setExternalPopup(null);
                        timer && clearInterval(timer);
                    })
                }
            }, 1000)
        },
        [externalPopup]
    )

    return (
        <Button
            onClick={connectClick}
            type="button"
            fullWidth
            variant="outlined"
            sx={{ mt: 5 }}>
            <SvgIcon viewBox="0 0 32 32" sx={{ mr: 1 }}>
                <path d="M 20.800781 1 L 15.199219 17.199219 L 10.199219 4 L 7 4 L 14 22.599609 L 14 31 L 17 31 L 17 21.099609 L 24 1 L 20.800781 1 z"/>
            </SvgIcon>
            Continue with Yandex
        </Button>
    )
}
