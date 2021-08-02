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

const generateConnectedSkills = (chosenSkills) => {
  let result = []
  for(let i = 0; i < chosenSkills.length; i++) {
    result.push({skillId: chosenSkills[i], offset: 1});
  }
  return result;
}

export default function SkillCreate({categories}) {


  const[formData, setFormData] = useState({
    title: "",
    categoryId: ""
  });

  const classes = useStyles()


  const createActivity = (e) => {
    e.preventDefault()
    const configObject = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        title: formData.title,
        categoryid: formData.categoryId,
        status: true,
      })
    }
    fetch('https://localhost:44353/api/skills', configObject)
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
        <Typography variant="h4">Создать навык</Typography>
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
              <InputLabel id="category-select-label">Категория</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                variant="outlined"
                value={formData.categoryId}
                name="categoryId"
                onChange={handleChange}>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={createActivity}
              >Создать</Button>
            </Grid>

          </Grid>
        </form>
      </Box>
    </MainContainer>


  )
}

export async function getStaticProps(context) {
  const res = await fetch(`http://164.90.174.1/api/categories`)
  const categories = await res.json()

  return {
    props: { categories }, // will be passed to the page component as props
  }
}
