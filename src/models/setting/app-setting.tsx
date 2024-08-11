/**
 * @param identifier The unique identifier used in `/services/i18n.ts`, such as `en_US` and `zh_CN` etc.
 * @param label The name of language, such as `English` for `en_US` and `简体中文` for `zh_CN`
 * @see /services/i18n.ts
 */
export interface ILanguageSetting {
    identifier: string,
    label: string,
}

export class LanguageSetting implements ILanguageSetting {
    identifier: string;
    label: string;
    constructor(identifier: string, label: string) {
        this.identifier = identifier;
        this.label = label;
    }
}
export interface IAppSetting {
    language: ILanguageSetting;
}
export class AppSetting implements IAppSetting {
    language: ILanguageSetting;
    constructor(language: ILanguageSetting) {
        this.language = language
    }
}