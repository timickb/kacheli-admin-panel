import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {
  Box,
  Button, Chip,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem, Select,
  TextField
} from "@material-ui/core";
import MainContainer from '../../components/MainContainer'
import Typography from "@material-ui/core/Typography";
import {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ActivityService from "../../src/services/ActivityService";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));


export default function CategoryCreate() {


  const[formData, setFormData] = useState({
    title: "",
  });

  const classes = useStyles()


  const createCategory = (e) => {
    e.preventDefault()
    const configObject = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        title: formData.title,
        status: true,
      })
    }
    fetch('https://kacheli.azurewebsites.net/api/categories', configObject)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log([e.target.name], e.target.value)
  }


  return (
    <MainContainer>
      <Box p={3}>
        <Typography variant="h4">Создать категорию</Typography>
        <form style={{marginTop: '20px'}}>
          <Grid container direction="column" spacing="4">
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="Заголовок"
                name="title"
                valuevalue={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={createCategory}
              >Создать</Button>
            </Grid>

          </Grid>
        </form>
      </Box>
    </MainContainer>


  )
}
