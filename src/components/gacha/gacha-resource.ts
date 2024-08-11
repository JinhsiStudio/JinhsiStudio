import jinhsi from '@/assets/resonators/jinhsi.webp';
import changli from '@/assets/resonators/changli.webp';
import { useTranslation } from "react-i18next";

enum Character{
    Jinhsi = 1304,
    Changli = 1205
}

/**
 * Should be used in React Component
 */
export function matchResource(name: string, resourceId: number): string | null {
    const {t} = useTranslation('resource');
    //TODO match resource with resourceId instead of name
    switch(resourceId){
        case Character.Changli:
            return changli
        case Character.Jinhsi:
            return jinhsi
    }
    switch (name) {
        case t('Character.Changli'):
            return changli
        case t('Character.Jinhsi'):
            return jinhsi
        default:
            console.error("Unmatched resource: ",name,"with id: ",resourceId)
            return null
    }
}