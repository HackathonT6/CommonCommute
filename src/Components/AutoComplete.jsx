import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import _debounce from "lodash/debounce";
import axios from "axios";

const AutoComplete = () => {
  const [destination, setDestination] = React.useState("");
  const [searchObject, setSearchObject] = React.useState({
    versionNumber: 2,
    ext: "json",
    language: "en-US",
    limit: 10,
  });
  const [options, setOptions] = React.useState([]);
  const [destinationSelection, setDestinationSelection] = React.useState(
    options[0]
  );

  const handleDebounceFunction = async (inputValue) => {
    try {
      const myQuery = inputValue;

      const response = await axios.get(
        ` https://api.tomtom.com/search/2/search/${myQuery}.json?limit=${searchObject.limit}&lat=37.337&lon=-121.89&minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=off&key=g1gbw2nKiP2IVIli2AsKNICCYL2qIoc5`
      );

      setOptions(response.data.results);
      console.log(response.data.results);
    } catch (err) {
      alert(err);
    }
  };

  const debounceFunction = React.useCallback(
    _debounce(handleDebounceFunction, 1000),
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
      <Box className="page-wrapper">
        <Autocomplete
          id="country-select-demo"
          value={destinationSelection}
          onChange={(event, newValue) => {
            setDestinationSelection(newValue);
          }}
          sx={{ width: "100%" }}
          options={options}
          autoHighlight
          getOptionLabel={(option) =>
            `${option.address.freeformAddress} (${option.address.country})`
          }
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
              key={option.distance}
            >
              {option.address.freeformAddress} ({option.address.country})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              id="destination"
              name="destination"
              label="Destination"
              sx={{ my: 1.5 }}
              value={destination}
              onChange={handleChangeDestination}
              fullWidth
              {...params}
              label="Choose a destination"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      </Box>
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
