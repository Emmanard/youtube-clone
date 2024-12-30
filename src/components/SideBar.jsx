import React from 'react'
import { Stack } from '@mui/material'
import { categories } from '../utils/constants'



const SideBar = ({selectedCategory,setSelectedCategory}) => (

  <Stack direction='row' sx={{
    overflow: 'auto',
    height: {sx:'auto', md: 'coloumn'},
    flexDirection: {md:'column',}
  }}  >
{categories.map((categories)=>(
  
  <button className='category-btn'
  onClick={()=>setSelectedCategory(categories.name)}
  style={{
    background: categories.name === selectedCategory && '#FC1503',
    color: 'white'
  }}
  key={categories.name} >
    <span>{categories.icon}</span>
    <span>{categories.name}</span>

  </button>
))}
  </Stack>
)

export default SideBar
