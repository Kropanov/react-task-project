import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EnhancedTable from "../EnhancedTable/EnhancedTable";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Typography component={'span'}>{children}</Typography>
            )}
        </div>
    );
}

function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = useState(0);

    const [categories, setCategories] = useState([]);
    const [anime, setAnime] = useState([]);
    const [manga, setManga] = useState([]);

    useEffect( () => {
        const getData = async (req, type) => {
            return await fetch(req).then((response) => {
                response.json().then((data) => {
                    switch(type) {
                        case 'anime':
                            setAnime(() => {
                                let items = [];
                                data.data.forEach((item) => {
                                    items.push(createData(item.attributes.canonicalTitle, item.id, item.type, item.attributes.episodeCount, item.attributes.synopsis.substring(0, 25)));
                                });
                                return items;
                            });
                            break;
                        case 'manga':
                            setManga(() => {
                                let items = [];
                                data.data.forEach((item) => {
                                    items.push(createData(item.attributes.canonicalTitle, item.id, item.type, item.attributes.chapterCount, item.attributes.synopsis.substring(0, 25)));
                                });
                                return items;
                            });
                            break;
                        case 'categories':
                            setCategories(() => {
                                let items = [];
                                data.data.forEach((item) => {
                                    items.push(createData(item.attributes.title, item.id, item.type, item.attributes.totalMediaCount, item.attributes.description.substring(0, 25)));
                                });
                                return items;
                            });
                            break;
                        default:
                            console.log('Unknown Type')
                    }
                }).catch((err) => {
                    console.log(err);
                })
            });
        }

        getData('https://kitsu.io/api/edge/anime', 'anime');
        getData('https://kitsu.io/api/edge/manga', 'manga');
        getData('https://kitsu.io/api/edge/categories', 'categories');
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // console.log("anime", anime)
    // console.log("manga", manga)
    // console.log("categories", categories)

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Table One" {...a11yProps(0)} />
                    <Tab label="Table Two" {...a11yProps(1)} />
                    <Tab label="Table Three" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <EnhancedTable
                    data={categories}
                    setData={setCategories}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <EnhancedTable
                    data={anime}
                    setData={setAnime}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <EnhancedTable
                    data={manga}
                    setData={setManga}
                />
            </TabPanel>
        </Box>
    );
}