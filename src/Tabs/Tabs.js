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
    const [value, setValue] = React.useState(0);
    const [data, setData] = useState([])

    useEffect( () => {
        const getData = async (req) => {
            return await fetch(req).then((response) => {
                console.log('Rendering data')
                response.json().then((data) => {
                    setData((prev) => ([
                        ...prev,
                        data.data
                    ]))
                }).catch((err) => {
                    console.log(err);
                })
            });
        }
        getData('https://kitsu.io/api/edge/anime');
        getData('https://kitsu.io/api/edge/manga');
        getData('https://kitsu.io/api/edge/categories');
      }, []);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // console.log(data)
    
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Table One" {...a11yProps(0)} />
                    <Tab label="Table Two" {...a11yProps(1)} />
                    <Tab label="Table Three" {...a11yProps(2)} />
                </Tabs>
            </Box>
            { data.map((item , index) => (
                <TabPanel value={value} index={index} key={index}>
                    {data != null ? <EnhancedTable indexTable={index} dataStore={data} /> : "Загрузка..."}
                </TabPanel>
            )) }
        </Box>
    );
}