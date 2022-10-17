import { useRouter } from "vue-router"

export function useRouteAction() {
    const router = useRouter();
    const redirectBack = () => router.back();
    const redirectHome = () => router.push({ name: 'home'});
    const redirectErrorPage = () => router.push({ name: '404-not-found'});

    return { redirectBack, redirectHome, redirectErrorPage };
}