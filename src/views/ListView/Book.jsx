import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const Book = ({ book, onSelect, onEdit }) => {
  const labelId = `book-label-${book.id}`;
  const [selected, setSelected] = useState(false);

  const handleEdit = () => {
    setSelected(!selected);
    onSelect(book);
  };

  return (
    <ListItem key={book.id} role={undefined} dense button onClick={handleEdit}>
      <ListItemIcon>
        <Checkbox data-testid="checkBox" edge="start" checked={selected} inputProps={{ 'aria-labelledby': labelId }} />
      </ListItemIcon>
      <ListItemText
        id={labelId}
        primary={`${book.bookId}. ${book.title} (£${book.price.toFixed(2)})`}
        secondary={`By ${book.author}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" data-testid="editIcon" onClick={() => onEdit(book.bookId)}>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Book;
