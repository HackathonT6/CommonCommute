import * as React from "react";
import Slider from "@mui/material/Slider";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { v4 as uuidv4 } from "uuid";

const Preferences = () => {
	const [prefGroupNum, setPrefGroupNum] = React.useState(0);
	const dbPrefs = {
		Music: 0,
		Movies: 0,
		History: 0,
		Politics: 0,
		PC: 0,
		Foreign_languages: 0,
		Art_exhibitions: 0,
		Religion: 0,
		Countryside: 0,
		outdoors: 0,
		Dancing: 0,
		Musical_instruments: 0,
		Shopping: 0,
		Science_and_technology: 0,
		Theatre: 0,
		Adrenaline_sports: 0,
	}; //!!!!!!!!!! will be changed to get data from DB
	const [prefs, setPrefs] = React.useState({});

	const handleChange = (e) => {
		setPrefs({
			...prefs,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("prefs: ", prefs);
	};

	React.useEffect(() => {
		setPrefs(dbPrefs);
	}, []);

	const customTheme = createTheme({
		palette: {
			secondary: {
				main: "#C6D8D3",
				contrastText: "#fff ",
			},
			slider: {
				trackColor: "#C6D8D3",
				selectionColor: "#335c67",
			},
		},
	});

	return (
		<ThemeProvider theme={customTheme}>
			<div className="page-wrapper">
				<h1>Preferences</h1>
				<div className="pref-form-container">
					<div style={{ flexBasis: "10%", alignSelf: "center" }}>
						{prefGroupNum !== 0 ? (
							<Button onClick={() => setPrefGroupNum((prev) => prev - 5)}>
								<ArrowBackIosIcon />
							</Button>
						) : (
							<> </>
						)}
					</div>
					<Box
						sx={{ mt: 3 }}
						style={{ flexBasis: "80% !important", padding: "0" }}
					>
						<form onSubmit={handleSubmit}>
							{prefs &&
								Object.keys(prefs)
									.slice(prefGroupNum, prefGroupNum + 4)
									.map((key) => {
										return (
											<>
												<Typography
													key={uuidv4()}
													id={`choose-pref=${key}`}
													gutterBottom
												>
													{key.replace(/_/g, " ")}
												</Typography>
												<Slider
													key={uuidv4()}
													aria-label={key.replace(/_/g, " ")}
													// getAriaValueText={prefs[key]}
													placeholder={prefs[key]}
													valueLabelDisplay="auto"
													defaultValue={prefs[key]}
													step={1}
													marks={[
														{ value: 1, label: "1" },
														{ value: 2, label: "2" },
														{ value: 3, label: "3" },
														{ value: 4, label: "4" },
														{ value: 5, label: "5" },
													]}
													min={1}
													max={5}
													name={key}
													value={prefs[key]}
													onChange={handleChange}
													color="secondary"
												/>
											</>
										);
									})}

							<Button
								id="appButton"
								color="primary"
								variant="contained"
								fullWidth
								type="submit"
							>
								Submit
							</Button>
						</form>
					</Box>
					<div style={{ flexBasis: "10%", alignSelf: "center" }}>
						{prefGroupNum < 10 ? (
							<Button onClick={() => setPrefGroupNum((prev) => prev + 5)}>
								<ArrowForwardIosIcon />
							</Button>
						) : (
							<> </>
						)}
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default Preferences;


//backend key.replace
//setprefs route
