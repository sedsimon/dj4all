import { useState } from "react"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import Stack from '@mui/material/Stack'
import {cloneDeep} from 'lodash'
import { ClickAwayListener } from "@mui/material"
import {red,green} from "@mui/material/colors"

const initialOptions = [
  {
    id: 0,
    option: "Do Nothing",
    edit: false
  },
  {
    id: 1,
    option: "Invest $50k",
    edit: false
  }
]

const optionStore = {}

export default function Questions({children}) {

  const [options, setOptions] = useState(initialOptions)

  

  function addNewOption() {
    const id = options.length;
    setOptions(options.concat(
      {
        id,
        option: "",
        edit: true
      }
    ));
    optionStore[id] = "";
  }

  function handleSave(id) {
    const newOptions = cloneDeep(options);
    if (newOptions[id].option == "") {
      handleDelete(id);
    } else {
      newOptions[id].edit = false;
      setOptions(newOptions);
      delete optionStore[id];
    }
  }

  function handleListItemClick(option,id){
    // loop through options and cancel the others
    const newOptions = options.map((elem) => {
      let newOption = elem.option;
      if (optionStore[elem.id]) {
        newOption = optionStore[elem.id];
        delete optionStore[elem.id];
      }
      return {
        id:elem.id,
        option: newOption,
        edit: false
      }
    });
    newOptions[id].edit = true;
    setOptions(newOptions);
    optionStore[id] = option;
  }

  function handleCancel(id) {
    const newOptions = cloneDeep(options);
    if (optionStore[id] == "") {
      newOptions.splice(id,1);
    } else {
      newOptions[id].edit = false;
      newOptions[id].option = optionStore[id];
    }
    delete optionStore[id];
    setOptions(newOptions);
  }

  function handleChange(e,id) {
    const newOptions = cloneDeep(options);
    newOptions[id].option = e.target.value;
    setOptions(newOptions);
  }

  function handleDelete(id) {
    const newOptions = cloneDeep(options);
    newOptions.splice(id,1);
    setOptions(newOptions);
  }

  function handleKeyDown(e,id) {
    if (e.key == "Escape") {
      handleCancel(id);
    } else if (e.key == "Enter") {
      handleSave(id);
    }
  }

  return (
    <>
    <List>
      {options.map(({id,option,edit}) => 
        edit? 
        <ClickAwayListener onClickAway={() => handleCancel(id)} key={id}>
          <Stack direction="row" spacing="2">
            <TextField label="Option" variant="outlined"
              autoComplete="off" value={option} onChange={(e) => handleChange(e,id)}
              onKeyDown={(e) => handleKeyDown(e,id)}
              autoFocus={true}/>
            <IconButton aria-label="cancel" onClick={() => handleCancel(id)}>
              <CloseIcon sx={{ color: red[500] }}/>
            </IconButton>
            <IconButton aria-label="save" onClick={() => handleSave(id)}>
              <CheckIcon sx={{ color: green[500] }}/>
            </IconButton>
          </Stack>
        </ClickAwayListener>
        :
        <ListItem
            key={id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(id)}>
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
          <ListItemButton onClick={() => handleListItemClick(option,id)}>
            <ListItemText primary={option}/>
          </ListItemButton>
        </ListItem>
        
      ) 
      }
        

    </List>
    <Button onClick={addNewOption} variant="outlined">Add to List</Button>
    {children}
    </>
  )
}