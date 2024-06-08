import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {getFeedPost} from '../rtk/reducers/postReducer'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Feed() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFeedPost())
    }, [])
    const feed = useSelector(state => {
        return state.post.posts
    })
    console.log('feed===',feed)

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            {
                feed?.map((data)=>(
                    <Card sx={{ width: 500, margin: "20px" }} key={data?._id}>
                        <CardHeader
                            avatar={
                                <Avatar alt={data?.userData?.username} sx={{ bgcolor: blue[500] }} aria-label={data?.userData?.username}/>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={data?.userData?.username}
                            subheader={data?.createdAt}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={data?.image}
                            alt="test Image"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {data?.title}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="like">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))
                    }
        </div>
    )
}

export default Feed