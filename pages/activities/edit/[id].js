import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import MainContainer from "../../../components/MainContainer";
import {Box, Button, Grid, Switch, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

export default function ActivityEdit({activity}) {
  const router = useRouter()

  const [updated, setUpdated] = useState(false)

  const[formData, setFormData] = useState({
    title: activity?.title,
    description: activity?.description,
    minAge: activity?.minAge,
    maxAge: activity?.maxAge,
    status: activity?.status
  });


  const updateActivity = (e) => {
    e.preventDefault()
    const configObject = {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        minAge: formData.minAge,
        maxAge: formData.maxAge,
        status: formData.status,
        connectedSkill: []
      })
    }
    fetch('https://kacheli.azurewebsites.net/api/activities/' + activity.id, configObject)
      .then(res => res.json())
      .then(data => {
        setUpdated(true);
        console.log(data)
      })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    //console.log([e.target.name], e.target.value)
  }

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    })
  }


  return (
    <MainContainer>
      <Box p={3}>
        <Typography variant="h4">Редактировать активность</Typography>
        <form style={{marginTop: '20px'}}>
          <Grid container direction="column" spacing="4">
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="Заголовок"
                name="title"
                value={formData.title}
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
              <Typography>Статус активности</Typography>
              <Switch
                checked={formData.status}
                onChange={handleStatusChange}
                name="status"
                color="primary"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={updateActivity}
              >Обновить</Button>
            </Grid>
            <Grid item>
              <Typography>{updated ? "Изменения сохранены" : ""}</Typography>
            </Grid>

          </Grid>
        </form>
      </Box>
    </MainContainer>


  )
}

export async function getStaticPaths() {
  const res = await fetch(`https://kacheli.azurewebsites.net/api/activities`, {cache: "no-store"})
  const activities = await res.json()

  const paths = activities.map((activity) => ({
    params: {id: activity.id}
  }))

  return {
    paths, fallback: false
  }
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://kacheli.azurewebsites.net/api/activities/${params.id}`, {cache: "no-store"})
  const activity = await res.json()

  // Pass post data to the page via props
  return { props: { activity } }
}
