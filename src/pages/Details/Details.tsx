import styles from "./Details.module.scss";
import {useStore} from "../../hooks/use-store";
import {useNavigate, useParams} from "react-router-dom";
import {Fragment, useEffect} from "react";
import {Grid} from "@mui/material";
import {dateTimeFormatter} from "../../utils/js/utils";
import JobCard from "../../components/JobCard/JobCard";
import Loader from "../../components/Loader/Loader";
import locales from "../../locales/locales";
import HTMLReactParser from "html-react-parser";
import Card from "@mui/material/Card";

const Details = () => {
    const [globalState, dispatch] = useStore(true);
    const params = useParams();
    const uuid = params.uuid || "";
    const job = globalState.data.jobs.find((job: Job) => job.uuid === uuid);
    const navigate = useNavigate();
    console.log(job);

    useEffect(() => {
        if (!job) navigate("/", {replace: true});
    }, [job, navigate]);

    useEffect(() => {
        const popStateHandler = () => {
            const currentPage = localStorage.getItem("currentPage") || 1;
            const query = localStorage.getItem("query") || "";
            dispatch("SET_PAGE", currentPage);
            dispatch("SET_QUERY", query);
        }

        window.addEventListener("popstate", popStateHandler);
        return () => {
            window.removeEventListener("popstate", popStateHandler);
        }
    }, [dispatch]);

    return (
        <Fragment>
            {!job && <Loader/>}
            {!!job && <Grid container className={styles.main} spacing={2}>
                <Grid item lg={4} md={12} className={styles.list}>
                    <Grid container spacing={2}>
                        {globalState.data.jobs.map((job: Job) => {
                            return <Grid item xs={12} key={job.uuid}>
                                <JobCard inDetails={true} job={job} clickable={job.uuid !== params.uuid}
                                         active={job.uuid === params.uuid}/>
                            </Grid>
                        })}
                    </Grid>
                </Grid>
                <Grid item lg={6} className={styles.details}>
                    <h1>{job.title} {!!job.job_type?.length && `- ${job.job_type.join(", ")}`}</h1>
                    <span>Posted On: {dateTimeFormatter(job.posted_at)}</span>
                    {!!job.description && <Card sx={{margin: "10px 0", padding: "5px 10px"}}>
                        <h3>{locales.description}</h3>
                        {HTMLReactParser(job.description)}
                    </Card>}

                    {!!job.requirements && <Card sx={{margin: "5px 0", padding: "5px 10px"}}>
                        <h3>{locales.requirements}</h3>
                        {HTMLReactParser(job.requirements)}
                    </Card>}

                    {!!job.skills?.length && <Card sx={{margin: "5px 0", padding: "5px 10px"}}>
                        <h3>{locales.skills}</h3>
                        <ul>
                            {job.skills.map((skill: string, index: number) => {
                                return <li style={{textTransform: "capitalize"}} key={index}>{skill}</li>
                            })}
                        </ul>
                    </Card>}

                    <Card sx={{margin: "5px 0", padding: "5px 10px"}}>
                        <h3>{locales.summary}</h3>
                        <ul>
                            <li>
                                <strong>{locales.salaryRange}:</strong> {job.salary.min} - {job.salary.max}
                            </li>
                            {!!job.industry?.length && <li>
                                <strong>{locales.industry}:</strong> {job.industry.join(", ")}
                            </li>
                            }
                            {!!job.major?.length && <li>
                                <strong>{locales.major}:</strong> {job.major.join(", ")}
                            </li>
                            }
                            {!!job.career_level?.length && <li>
                                <strong>{locales.careerLevel}:</strong> {job.career_level.join(", ")}
                            </li>
                            }
                        </ul>
                    </Card>
                </Grid>
            </Grid>}
        </Fragment>
    );
}

export default Details;