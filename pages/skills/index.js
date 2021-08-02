import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {Box, Button} from "@material-ui/core";
import MainContainer from '../../components/MainContainer'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const columns = [
  {
    field: 'title',
    headerName: 'Название',
    width: 200,
    editable: false,
  },
  {
    field: 'category',
    headerName: 'Категория',
    width: 200,
    editable: false,
  },
];


export default function SkillsIndex() {

  const [skills, setSkills] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('https://localhost:44353/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data))
  })

  const mapSkills = (s) => {
    for(let i = 0; i < s.length; i++) {
      s.category = s.category?.title
    }
    return s;
  }


  return (
    <MainContainer><Box p={3}>
      <div style={{ height: 640, width: '100%', margin: '10px' }}>
        <DataGrid
          rows={mapSkills(skills)}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <div style={{margin: '10px'}}>
        <Button variant="contained" color="primary">Добавить</Button>
      </div>
    </Box></MainContainer>


  )
}
