import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import driver from '../../utilities/neo4j';
import {filterNames} from "../../constants/misc";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class Filter extends Component {

    handleChange = event => {
        this.props.select(event.target.value);
        driver.session().run('MATCH (c:City) RETURN c.wkt AS wkt')
            .then(res => {
                this.props.handleSelect(res.records.map(r => r.get('wkt')));
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <FormControl className={ classes.formControl }>
                <InputLabel htmlFor="select-multiple-checkbox">Filters</InputLabel>
                <Select
                    multiple
                    value={ this.props.selectedFilters }
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {filterNames.map(name => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={this.props.selectedFilters.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

Filter.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedFilters: PropTypes.array,
    select: PropTypes.func,
    addWkt: PropTypes.func,
    handleSelect: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(Filter);
