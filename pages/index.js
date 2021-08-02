import React from 'react'
import makeStyles  from '@material-ui/styles/makeStyles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { increment, decrement } from '../src/actions'
import { bindActionCreators } from 'redux'
import { INCREMENT } from '../src/constants'
import {Box, Button} from "@material-ui/core";
import {useRouter} from "next/router";


const Index = () => {
  const router = useRouter()
  return (
    <Box p={3}>
      <Button variant="contained" color="primary" onClick={() => router.push('/activities')}>Активности</Button>
      <Button variant="contained" color="primary" onClick={() => router.push('/categories')}>Категории (еще сыро)</Button>
      <Button variant="contained" color="primary" onClick={() => router.push('/skills')}>Скиллы (очень сыро)</Button>
    </Box>
  )
}

export default Index;
