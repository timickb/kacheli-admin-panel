import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {Box, Button} from "@material-ui/core";
import MainContainer from '../../components/MainContainer'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const columns = [
  {
    field: 'title',
    headerName: 'Название',
    width: 200,
    editable: false,
  },
];


export default function CategoriesIndex() {
  const [categories, setCategories] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('https://kacheli.azurewebsites.net/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  })
  return (
    <MainContainer><Box p={3}>
      <div style={{ height: 640, width: '100%', margin: '10px' }}>
        <DataGrid
          rows={categories}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <div style={{margin: '10px'}}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/categories/create')}>
          Добавить
        </Button>
      </div>
    </Box></MainContainer>


  )
}
