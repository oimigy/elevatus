import {Link, useRouteError} from "react-router-dom";
import styles from "./ErrorPage.module.scss";
import locales from "../../locales/locales";

const ErrorPage = () => {
    const error = useRouteError() as { message: string, statusText: string, status: number };

    const getErrorMessage = () => {
        if(error.status === 404) {
            return locales.notFound;
        }
        return error.statusText||error.message;
    }

    return (
        <div id="error-page" className={styles.errorPage}>
            <h1>{locales.oops}</h1>
            <p>{locales.sorry}</p>
            <p>
                <i>{getErrorMessage()}</i>
            </p>
            <Link to={"/"}>{locales.goToHomePage}</Link>
        </div>
    );
}

export default ErrorPage;