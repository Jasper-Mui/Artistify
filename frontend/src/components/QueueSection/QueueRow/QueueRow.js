import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { makeStyles } from "@material-ui/core/styles";

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import {
  IconButton,
  Grid,
  Typography,
} from "@material-ui/core";
import { formatVideoTitle } from "../../../functions";

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "move",
    display: "inline-block",
    width: "100px",
    position: "relative",
    marginLeft: "41.5px",
    marginTop: "25px",
    "&:hover > *": {
      visibility: "visible !important",
    },
  },
  overlay: {
    visibility: "hidden",
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(0.5),
  },
}));

export default function ImgMediaCard({
  id,
  index,
  nowPlaying,
  onClickImage,
  author,
  moveCard,
  qid,
  queue,
  setQueue,
  title,
  timestamp
}) {
  const classes = useStyles();

  const ref = useRef(null);

  const removeQueueItem = () => {
    setQueue(
      queue.filter((item) => {
        return item.qid !== qid;
      })
    );
  };

  const [, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Grid item container
      onClick={() => onClickImage(qid)}
      direction="row"
      alignItems="center"
      ref={ref}
      style={{
        backgroundColor: (nowPlaying && nowPlaying.qid) === qid && "#FE9021",
        opacity,
      }}
    >
      <Grid item xs={1}>
        <IconButton
        // onClick={() => onClickImage(qid)}
        >
          <PlayArrowIcon />
        </IconButton>
      </Grid>
      <Grid item xs={10}>
        <Typography>
          {title
          }
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>
          {timestamp}
        </Typography>
      </Grid>
    </Grid>
  );
}
