import { Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchUser,
  getloginState,

  getID,
  userInfo,
} from "../../../app/reducer/userReducer";
import CampaignIcon from "@mui/icons-material/Campaign";
import ChatIcon from "@mui/icons-material/Chat";
import UploadIcon from "@mui/icons-material/Upload";
import "./Emergency.scss";
import Box from '@mui/material/Box';
import { ButtonGroup } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


export function Emergency() {
  const [type, setType] = useState("harassment");
  const [images, setImage] = useState<Array<any>>([]);
  const [isAmergency, setIsAmergency] = useState(false);
  const [upload, setUpload] = useState(false);
  const [{ imageUrl, imagetype }, setImageUrl] = useState({
    imageUrl: "",
    imagetype: "",
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector(userInfo);
  const org = {};
  const { accidentName } = useParams();
  let isLogged = useAppSelector(getloginState);
  const navigate = useNavigate();

  const accidentType = [
    {
      value: "emergency",
      label: "emergency",
    },
    {
      value: "harassment",
      label: "harassment",
    },
    {
      value: "home violence",
      label: "home violence",
    },
    {
      value: " violence event",
      label: " violence event",
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
    if (event.target.value === "emergency") {
      setIsAmergency(true);
    } else {
      setIsAmergency(false);
    }
  };
  //axios post media
  function selectfileHandler(ev: any) {
    console.log(ev.target.files[0]);
    setImage([...images, ev.target.files[0]]);
  }

  async function newAccidentHandler(ev: any) {
    ev.preventDefault();
    console.log(ev.target.elements.type.value);
    console.log(ev.target.elements.location.value);
    console.log(ev.target.elements.description.value);
    console.log(isAmergency);
    console.log(images);

    const formData = new FormData();
    formData.append("file", images[0]);
    formData.append("api_key", "327772261325556");
    formData.append("upload_preset", "tfv02nzm");
    formData.append("public_id", "sample_image2");
    formData.append("timestamp", `${new Date().getTime()}`);

    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dqzgolqdg/image/upload",
      formData
    );
    setImageUrl(data.secure_url);

    //fetch media
    axios
      .post("http://localhost:3001/accidents/addNewAccident", {
        type: ev.target.elements.type.value,
        emergency: isAmergency,
        date: new Date(),
        address: ev.target.elements.location.value,
        description: ev.target.elements.description.value,
        media: imageUrl,
        user: user,
        org: {},
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }
  function handleUpload() {
    setUpload(true);
  }
  return (
    <div className="accident">

      <h3 className='headingInfo'> report accident <ChevronLeftIcon sx={{ fontSize: 30 }} /></h3>

      <div className="accident_body">
        <form onSubmit={newAccidentHandler}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '15ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              style={{ width: "100%", borderColor: "eb655", color: "#eb655b" }}
              select
              name="type"
              label="اختار نوع الحدث"
              value={type}
              onChange={handleChange}>
              {accidentType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="location"
              id="standard-size-normal"
              defaultValue="موقع"
              variant="standard"
            />
            <TextField
              name="description"
              id="standard-size-normal"
              defaultValue="وصف الحالة"
              variant="standard"

            />
            {upload ? (
              <input
                style={{ borderColor: "#eb655", color: "#eb655b" }}
                type="file"
                onChange={selectfileHandler}></input>
            ) : (
              <Button
                startIcon={<UploadIcon></UploadIcon>}
                onClick={handleUpload}
                style={{ width: "100%", borderColor: "black", color: "black" }}
                variant="outlined">
                تحميل الصورة
              </Button>
            )}
          </Box>

          <ButtonGroup className='buttonGroup' variant="outlined" aria-label="outlined primary button group">

            <Button className='reportInfo' style={{ width: "100%" }}>تقديم تقرير </Button>
          </ButtonGroup>

        </form>
      </div>
    </div>
  );
}
