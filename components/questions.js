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

const itemStore = {}

export default function Questions({initialItems}) {

  const [items, setItems] = useState(initialItems)

  function addNewItem() {
    const id = nanoid();
    setItems(items.concat(
      {
        id,
        text: "",
        edit: true
      }
    ));
    itemStore[id] = "";
  }

  function handleSave(index) {
    const newItems = cloneDeep(items);
    if (newItems[index].text == "") {
      handleDelete(index);
    } else {
      newItems[index].edit = false;
      setItems(newItems);
      delete itemStore[newItems[index].id];
    }
  }

  function handleListItemClick(text,index){
    // loop through options and cancel the others
    const newItems = items.map((elem) => {
      let newText = elem.text;
      if (itemStore[elem.id]) {
        newText = itemStore[elem.id];
        delete itemStore[elem.id];
      }
      return {
        id:elem.id,
        text: newText,
        edit: false
      }
    });
    newItems[index].edit = true;
    setItems(newItems);
    itemStore[newItems[index].id] = text;
  }

  function handleCancel(index) {
    const newItems = cloneDeep(items);
    if (itemStore[newItems[index].id] == "") {
      newItems.splice(index,1);
    } else {
      newItems[index].edit = false;
      newItems[index].text = itemStore[newItems[index].id];
    }
    delete itemStore[newItems[index].id];
    setItems(newItems);
  }

  function handleChange(e,index) {
    const newItems = cloneDeep(items);
    newItems[index].text = e.target.value;
    setItems(newItems);
  }

  function handleDelete(index) {
    const newItems = cloneDeep(items);
    newItems.splice(index,1);
    setItems(newItems);
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
      {items.map(({id,text,edit},index) => 
        edit? 
        <ClickAwayListener onClickAway={() => handleCancel(index)} key={id}>
          <Stack direction="row" spacing={2}>
            <TextField label="Option" variant="outlined"
              autoComplete="off" value={text} onChange={(e) => handleChange(e,index)}
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
          <ListItemButton onClick={() => handleListItemClick(text,index)}>
            <ListItemText primary={text}/>
          </ListItemButton>
        </ListItem>
        
      ) 
      }
        

    </List>
    <Button onClick={addNewItem} variant="outlined">Add to List</Button>
    </>
  )
}