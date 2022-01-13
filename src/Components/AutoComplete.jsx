import React from "react";
import { Box, TextField, Autocomplete, Typography } from "@mui/material";
import _debounce from "lodash/debounce";
import axios from "axios";

const AutoComplete = (props) => {
  const { destinationSelection, setFormObject } = props;
  const [destination, setDestination] = React.useState("");
  const [searchObject, setSearchObject] = React.useState({
    versionNumber: 2,
    language: "en-US",
    limit: 10,
  });
  const [options, setOptions] = React.useState([]);

  const handleDebounceFunction = async (inputValue) => {
    try {
      if (inputValue.length > 0) {
        const myQuery = inputValue;

        const response = await axios.get(
          ` https://api.tomtom.com/search/2/search/${myQuery}.json?limit=${searchObject.limit}&lat=37.337&lon=-121.89&minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=off&key=g1gbw2nKiP2IVIli2AsKNICCYL2qIoc5`
        );

        setOptions(response.data.results);
        console.log(response.data.results);
      }
      // Do nothing?
    } catch (err) {
      alert(err);
    }
  };

  const debounceFunction = React.useCallback(
    _debounce(handleDebounceFunction, 700),
    []
  );

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
    debounceFunction(e.target.value);
  };

  React.useEffect(() => {
    console.log(destinationSelection);
  }, [destinationSelection]);

  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        Where are you going?
      </Typography>
      <Autocomplete
        id="country-select-demo"
        sx={{ m: 1 }}
        value={destinationSelection}
        onChange={(event, newValue) => {
          setFormObject((prev) => ({
            ...prev,
            destinationSelection: newValue,
          }));
        }}
        options={options}
        autoHighlight
        getOptionLabel={(option) =>
          `${option.address.freeformAddress} (${option.address.country})`
        }
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.distance}>
            {option.address.freeformAddress} ({option.address.country})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            id="destination"
            name="destination"
            label="Destination"
            value={destination}
            onChange={handleChangeDestination}
            {...params}
            label="Choose a destination"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </>
  );
};

export default AutoComplete;

//{baseURL}/search/{versionNumber}/autocomplete/{query}.{ext}?key={Your_API_Key}&language={language}&limit={limit}&lat={lat}&lon={lon}&radius={radius}&countrySet={countrySet}&resultSet={resultSet}
// https://api.tomtom.com/search/2/search/Rome.json?limit=5&lat=37.337&lon=-121.89&minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=off&key=*****

//   const response = await axios.get(
//     `https://api.tomtom.com/search/${searchObject.versionNumber}/${myQuery}.${searchObject.ext}?key=g1gbw2nKiP2IVIli2AsKNICCYL2qIoc5&language=${searchObject.language}&limit=${searchObject.limit}`,
//     headers
//   );
