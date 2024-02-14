import {Fragment, useEffect, useState} from "react";
import {getJobs} from "../../utils/js/utils";
import {Grid, Input, Pagination} from "@mui/material";
import locales from "../../locales/locales";
import styles from "./Home.module.scss";
import JobCard from "../../components/JobCard/JobCard";
import Loader from "../../components/Loader/Loader";
import {useStore} from "../../hooks/use-store";

const Home = () => {
    const [globalState, dispatch] = useStore(true);
    const [loading, setLoading] = useState<boolean>(true);

    const getData = async () => {
        setLoading(true);
        try {
            const data = await getJobs(globalState.query, globalState.query ? 1 : globalState.currentPage);
           dispatch("SET_DATA", data.results);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        const getDataAsync = setTimeout(async  () => {
            await getData();
        }, 500);
        return () => clearTimeout(getDataAsync);
    }, [globalState.currentPage, globalState.query]);

    return (
        <main className={styles.main}>
            <Input
                id="search-jobs-by-title"
                className={styles.search}
                type={"search"}
                value={globalState.query}
                onChange={(e) => dispatch("SET_QUERY", e.target.value)}
                placeholder={locales.searchJobsByTitle}
            />
            {loading ? <Loader/> : <Fragment>
                {!!globalState.data.jobs.length && <>
                    <Grid container spacing={{xs: 0, md: 2}} className={styles.result}>
                        {globalState.data.jobs.map((job:Job) => {
                            return <JobCard key={job.uuid} job={job}/>;
                        })};
                    </Grid>
                    <Pagination color={"primary"} className={styles.pagination} count={globalState.data.pages} page={globalState.currentPage}
                                onChange={(event, page) => {
                                   dispatch("SET_PAGE", page);
                                }}/>
                </>}
                {!globalState.data.jobs.length && <h1 style={{textAlign: "center"}}>{locales.noJobsFound}</h1>}
            </Fragment>}
        </main>
    )
}

export default Home;