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
import { nanoid } from "nanoid"

const initialOptions = [
  {
    id: nanoid(),
    option: "Do Nothing",
    edit: false
  },
  {
    id: nanoid(),
    option: "Invest $50k",
    edit: false
  }
]

const optionStore = {}

export default function Questions({children}) {

  const [options, setOptions] = useState(initialOptions)

  

  function addNewOption() {
    const id = nanoid();
    setOptions(options.concat(
      {
        id,
        option: "",
        edit: true
      }
    ));
    optionStore[id] = "";
  }

  function handleSave(index) {
    const newOptions = cloneDeep(options);
    if (newOptions[index].option == "") {
      handleDelete(index);
    } else {
      newOptions[index].edit = false;
      setOptions(newOptions);
      delete optionStore[newOptions[index].id];
    }
  }

  function handleListItemClick(option,index){
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
    newOptions[index].edit = true;
    setOptions(newOptions);
    optionStore[newOptions[index].id] = option;
  }

  function handleCancel(index) {
    const newOptions = cloneDeep(options);
    if (optionStore[newOptions[index].id] == "") {
      newOptions.splice(index,1);
    } else {
      newOptions[index].edit = false;
      newOptions[index].option = optionStore[newOptions[index].id];
    }
    delete optionStore[newOptions[index].id];
    setOptions(newOptions);
  }

  function handleChange(e,index) {
    const newOptions = cloneDeep(options);
    newOptions[index].option = e.target.value;
    setOptions(newOptions);
  }

  function handleDelete(index) {
    const newOptions = cloneDeep(options);
    newOptions.splice(index,1);
    setOptions(newOptions);
  }

  function handleKeyDown(e,index) {
    if (e.key == "Escape") {
      handleCancel(index);
    } else if (e.key == "Enter") {
      handleSave(index);
    }
  }

  return (
    <>
    <List>
      {options.map(({id,option,edit},index) => 
        edit? 
        <ClickAwayListener onClickAway={() => handleCancel(index)} key={id}>
          <Stack direction="row" spacing="2">
            <TextField label="Option" variant="outlined"
              autoComplete="off" value={option} onChange={(e) => handleChange(e,index)}
              onKeyDown={(e) => handleKeyDown(e,index)}
              autoFocus={true}/>
            <IconButton aria-label="cancel" onClick={() => handleCancel(index)}>
              <CloseIcon sx={{ color: red[500] }}/>
            </IconButton>
            <IconButton aria-label="save" onClick={() => handleSave(index)}>
              <CheckIcon sx={{ color: green[500] }}/>
            </IconButton>
          </Stack>
        </ClickAwayListener>
        :
        <ListItem
            key={id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
          <ListItemButton onClick={() => handleListItemClick(option,index)}>
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