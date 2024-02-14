import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import locales from "../../locales/locales";
import React, {useEffect} from "react";
import styles from "./LanguageSwitcher.module.scss";

const getLastSelectedLanguage =() => {
    return localStorage.getItem("language");
}

const LanguageSwitcher = () => {
    const currentLanguage = getLastSelectedLanguage() || locales.getLanguage();
    const availableLanguages = locales.getAvailableLanguages();
    const languageNames = availableLanguages.map(lang => {
        return new Intl.DisplayNames([currentLanguage], {
            type: 'language'
        }).of(lang);
    })
    const defaultLanguage = getLastSelectedLanguage() || locales.getInterfaceLanguage().split('-')[0].toLowerCase();


    useEffect(() => {
        locales.setLanguage(defaultLanguage);
        window.document.documentElement.lang = defaultLanguage;
        window.document.documentElement.dir = defaultLanguage === "ar" ? "rtl" : "ltr"
    }, [defaultLanguage]);

    const onChange = (e: SelectChangeEvent) => {
        const value = e.target.value;
        localStorage.setItem("language", value);
        window.location.reload();
    }

    return (
        <div>
            <Select value={defaultLanguage} onChange={onChange} className={styles.select}>
                {availableLanguages.map((lang, index) => {
                    return <MenuItem key={lang} value={lang}>{languageNames[index]}</MenuItem>
                })}
            </Select>
        </div>
    )
}

export default LanguageSwitcher;