import * as React from "react";
import styles from "./Logo.module.scss";
import {Link} from "react-router-dom";

const Logo = () => {
    return <Link to={"/"} className={styles.logo}>
        <img src="https://elevatus-production.s3.eu-central-1.amazonaws.com/career_portal/2021/05/15084eba-33e0-4a8a-b74c-8a158d12b6b2/original/y2ZqILiIdB5rmdH5XuG6ujLRHRJbweiyMbSrsYjN.png" alt="Logo"/>
    </Link>;
}

export default React.memo(Logo);