import * as React from "react";
import Slider from "@mui/material/Slider";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Preferences = () => {
	const [prefGroupNum, setPrefGroupNum] = React.useState(0);
	const [prefs, setPrefs] = React.useState({
		Music: 3,
		Movies: 3,
		History: 3,
		Politics: 3,
		PC: 3,
		Foreign_languages: 3,
		Art_exhibitions: 3,
		Religion: 3,
		Countryside: 3,
		outdoors: 3,
		Dancing: 3,
		Musical_instruments: 3,
		Shopping: 3,
		Science_and_technology: 3,
		Theatre: 3,
		Adrenaline_sports: 3,
	});

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
					<div style={{ flexBasis: "10%" ,alignSelf:"center"}}>
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
							{Object.keys(prefs)
								.slice(prefGroupNum, prefGroupNum + 4)
								.map((key) => {
									return (
										<>
											<Typography id={`choose-pref=${key}`} gutterBottom>
												{key.replace(/_/g, " ")}
											</Typography>
											<Slider
												aria-label={key.replace(/_/g, " ")}
												getAriaValueText={prefs.key}
												valueLabelDisplay="auto"
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
												value={prefs.key}
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
					<div style={{ flexBasis: "10%" ,alignSelf:"center"}}>
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
