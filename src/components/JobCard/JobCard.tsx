import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import styles from './JobCard.module.scss';
import {Link} from "react-router-dom";
import {dateTimeFormatter} from "../../utils/js/utils";
import { useNavigate } from "react-router-dom";



const JobCard = ({job, clickable = false, active = false, inDetails = false}: {
    job: Job,
    clickable?: boolean,
    active?: boolean,
    inDetails?: boolean
}) => {

    const navigate = useNavigate();

    const largeScreens = () => {
        return inDetails ? 12 : 3;
    }

    const mediumScreens = () => {
        return inDetails ? 12 : 6;
    }

    const getClasses = () => {
        let classes = styles.card;
        if (active) classes += ` ${styles.active}`;
        if (clickable && !active) classes += ` ${styles.clickable}`;
        return classes;
    }

    const clickHandler = (e: any) => {
        if(!clickable || active) return;
        navigate(`/details/${job.uuid}`, {replace: true});
        e.target.scrollIntoView({behavior: "smooth", block: "center"});
    }

    return (
        <Grid item lg={largeScreens()} md={mediumScreens()} xs={12} className={getClasses()} onClick={clickHandler}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom className={styles.title}>
                            {job.title}
                        </Typography>
                        <Typography variant="h5" component="div">

                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            {job.category}
                        </Typography>
                        <Typography variant="body2">
                            Posted On: {dateTimeFormatter(job.posted_at)}
                        </Typography>
                    </CardContent>
                    {!inDetails && <CardActions>
                        <Link className={styles.details} role={"button"} to={`/details/${job.uuid}`}>View Details</Link>
                    </CardActions>}
                </React.Fragment>
            </Card>
        </Grid>
    );
}

export default JobCard;