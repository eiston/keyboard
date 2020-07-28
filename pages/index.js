/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import {getSortedPostsData} from '../lib/posts';
import React from 'react';
import Box from '@material-ui/core/Box';
import {Container, Typography, Grid} from '@material-ui/core';
import {Card, CardActionArea, CardActions} from '@material-ui/core';
import {CardContent, CardMedia} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styles from '../styles/index.module.css';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import Link from 'next/link';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
const cardStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    flexGrow: 1,
    maxWidth: '18rem',
  },
  media: {
    minHeight: 140,
  },
  numberSold: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
    textAlign: 'right',
  },
}));

function MediaCard() {
  const classes = cardStyles();

  return (
    <Card className={classes.root}>
      <Link href={`/item/${1}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="subtitle1" noWrap={true}>
              Mechical Keyboard DIY kit
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <IconButton
          color="primary"
          aria-label="bookmark">
          <TurnedInNotIcon />
        </IconButton>
        <Typography variant="subtitle2"
          noWrap={true}>
            100 USD
        </Typography>
        <Typography variant="caption"
          className={classes.numberSold}
          noWrap={true}>
            1k sold
        </Typography>
      </CardActions>
    </Card>
  );
}
const filterStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function FilterList() {
  const classes = filterStyles();
  const [checked, setChecked] = React.useState([]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const filter = {
    'Accessories': [],
    'Cases': ['60% Case', '65% Case'],
    'DIY kit': [],
    'Foam': [],
    'Keycaps': [],
    'PCB': ['60% PCB', '65% PCB'],
    'Stabilizer': [],
    'Switches': ['Cherry', 'Gateron', 'Kailh'],
  };
  return (
    <List className={classes.root}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Filter
        </ListSubheader>
      }>
      {Object.keys(filter).map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <>
            <ListItem key={value} role={undefined}
              dense button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) > -1}
                  tabIndex={-1}
                  inputProps={{'aria-labelledby': labelId}}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
            <Collapse
              key={`${value}collapse`}
              in={checked.indexOf(value) > -1}
              timeout="auto"
              unmountOnExit>
              <List component="div" disablePadding>
                {filter[value].map((subValue) => (
                  <ListItem key={subValue}
                    dense button
                    className={classes.nested}
                    onClick={handleToggle(subValue)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(subValue) !== -1}
                        tabIndex={-1}
                        inputProps={{
                          'aria-labelledby': `checkbox-list-label-${subValue}`,
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={subValue} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        );
      })}
    </List>
  );
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  chip: {
    margin: 2,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function Home(props) {
  const classes = useStyles();
  const [sort, setSort] = React.useState([]);
  const sortBy = [
    'Hot',
    'New',
    'Price: low to high',
    'Price: high to low',
    'A-Z',
    'Z-A'];
  const handleSetSort = (event) => {
    setSort(event.target.value);
  };
  return (
    <React.Fragment>
      <Container>
        <Box my={2}>
          <Grid container spacing={3}>
            <Grid item xs={false} md={2} >
              <FilterList/>
            </Grid>
            <Grid item xs={12} md={10}>
              <FormControl className={classes.formControl} variant="outlined" >
                <InputLabel id="demo-mutiple-checkbox-label">
                  Sort By
                </InputLabel>
                <Select
                  value={sort}
                  onChange={handleSetSort}
                  label="Sort By"
                >
                  {sortBy.map((value) => (
                    <MenuItem key={value} value={value}>
                      <ListItemText primary={value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box className={styles.itemList}>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
