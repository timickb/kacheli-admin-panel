import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {Box, Button} from "@material-ui/core";
import MainContainer from '../../components/MainContainer'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Typography from "@material-ui/core/Typography";

const columns = [
  {
    field: 'id',
    headerName: 'Идентификатор',
    width: 200,
    editable: false,
  },
  {
    field: 'title',
    headerName: 'Название',
    width: 200,
    editable: false,
  },
  {
    field: 'minAge',
    headerName: 'Мин. возраст',
    type: 'number',
    width: 200,
    editable: false,
  },
  {
    field: 'maxAge',
    headerName: 'Макс. возраст',
    type: 'number',
    width: 200,
    editable: false,
  },
];


export default function ActivitiesIndex() {

  const [activities, setActivities] = useState([])

  const router = useRouter()

  useEffect(() => {
    fetch('https://kacheli.azurewebsites.net/api/activities', {cache: "no-store"})
      .then(res => res.json())
      .then(data => setActivities(data))
  })

  return (
    <MainContainer><Box p={3}>
      <Typography>Для редактирования сущности кликните дважды по соответствующей строке</Typography>
      <div style={{ height: 640, width: '100%', margin: '10px' }}>
        <DataGrid
          rows={activities}
          columns={columns}
          pageSize={10}
          checkboxSelection
          onCellDoubleClick={(e) => router.push('/activities/edit/' + e.id)}
        />
      </div>
      <div style={{margin: '10px'}}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/activities/create')}>
          Добавить
        </Button>
      </div>
    </Box></MainContainer>


  )
}
