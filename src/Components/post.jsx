import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";
import { InputLabel } from '@mui/material';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {blue} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {getUserPost, createPost} from '../rtk/reducers/postReducer'
import Checkbox from '@mui/material/Checkbox';

function Posts() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserPost())
    }, [])

    const [open, setOpen] = useState(false);
    const [isPrivate, setIsPrivate] = useState(true);
    const [postData, setPostData] = useState({});
    const [base64Image, setBase64Image] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const userPosts = useSelector(state => {
        return state.post.userPosts
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!postData.isPrivate) {
            postData['isPrivate'] = isPrivate;
        }
        dispatch(createPost(postData))
        handleClose()
    }

    const handleChange = (e) => {
        if (e.target.id === 'filePath') {
            let file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBase64Image(reader.result);
                };
                reader.readAsDataURL(file);
            }
            setPostData({...postData, [e.target.id]: base64Image})
        } else {
            setPostData({...postData, [e.target.id]: e.target.value})
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'background.paper',
        borderRadius: '4px',
        boxShadow: 24,
        p: 4,
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div>
            <Button variant="outlined" startIcon={<PostAddIcon />} onClick={handleOpen}>
                Add Post
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                >
                    <div style={{alignSelf: 'center'}}>
                        <h2>Add Post</h2>
                    </div>
                    <div style={{display: "flex", padding: '10px'}}>
                        <InputLabel
                            shrink={false}
                            htmlFor={"title"}
                            style={{padding: '10px 10px 10px 0'}}
                        >
                            <Typography>Title: </Typography>
                        </InputLabel>
                        <TextField
                            required
                            id="title"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={postData?.title}
                            variant="outlined"
                            placeholder='Enter Title'
                            onChange={handleChange}
                            onBlur={handleChange}
                        />
                    </div>
                    <div style={{display: "flex", padding: '10px'}}>
                        <InputLabel
                            shrink={false}
                            htmlFor={"filePath"}
                            style={{padding: '10px 10px 10px 0'}}
                        >
                            <Typography>Image: </Typography>
                        </InputLabel>
                        <TextField
                            required
                            id="filePath"
                            type="file"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleChange}
                        />
                    </div>
                    <div style={{display: "flex", padding: '10px'}}>
                        <InputLabel
                            shrink={false}
                            htmlFor={"description"}
                            style={{padding: '10px 10px 10px 0'}}
                        >
                            <Typography>Description: </Typography>
                        </InputLabel>
                        <TextField
                            id="description"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={postData?.description}
                            variant="outlined"
                            placeholder='Enter Description'
                            onChange={handleChange}
                            onBlur={handleChange}
                        />
                    </div>
                    <div style={{display: "flex", padding: '10px'}}>
                        <InputLabel
                            shrink={false}
                            htmlFor={"isPrivate"}
                            style={{padding: '10px 10px 10px 0'}}
                        >
                            <Typography>Private: </Typography>
                        </InputLabel>
                        <Checkbox {...label} required defaultChecked id="isPrivate" checked={isPrivate} onChange={()=>setIsPrivate(!isPrivate)}/>
                    </div>
                    <div style={{alignSelf: 'center'}}>
                        <Button variant="contained" onClick={handleSubmit}>ADD</Button>
                    </div>
                </Box>
            </Modal>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                {
                    userPosts.map((data)=>(
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
                                image={data?.filePath}
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
        </div>
    )
}

export default Posts