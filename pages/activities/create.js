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

export default function ActivityCreate({skills}) {

  let skillsTitles = {}
  for(let i = 0; i < skills.length; i++) {
    skillsTitles[skills[i].id] = skills[i].title
  }

  const [updated, setUpdated] = useState([])

  const[formData, setFormData] = useState({
    title: "",
    description: "",
    minAge: "",
    maxAge: "",
    chosenSkills: []
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
        description: formData.description,
        minAge: formData.minAge,
        maxAge: formData.maxAge,
        status: true,
        connectedSkills: generateConnectedSkills(formData.chosenSkills)
      })
    }
    fetch('https://kacheli.azurewebsites.net/api/activities', configObject)
      .then(res => res.json())
      .then(data => {
        setUpdated(true)
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
        <Typography variant="h4">Создать активность</Typography>
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
              <TextField
                fullWidth
                variant="outlined"
                label="Описание"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="Минимальный возраст"
                name="minAge"
                value={formData.minAge}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="Максимальный возраст"
                name="maxAge"
                value={formData.maxAge}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputLabel id="skills-select-label">Навыки</InputLabel>
              <Select
                labelId="skills-select-label"
                id="skills-select"
                fullWidth
                variant="outlined"
                multiple
                value={formData.chosenSkills}
                name="chosenSkills"
                onChange={handleChange}
                input={<Input id="select-multiple-skill" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={skillsTitles[value]} className={classes.chip} />
                    ))}
                  </div>
                )}
              >
                {skills.map((skill) => (
                  <MenuItem key={skill.id} value={skill.id}>
                    {skill.title}
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
            <Grid item><Typography>
              {updated ? "Активность создана" : ""}
            </Typography></Grid>
          </Grid>
        </form>
      </Box>
    </MainContainer>


  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://kacheli.azurewebsites.net/api/skills`)
  const skills = await res.json()

  return {
    props: { skills }, // will be passed to the page component as props
  }
}
