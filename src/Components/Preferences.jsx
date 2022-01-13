import * as React from "react";
import Slider from "@mui/material/Slider";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../Context/AppContext";
import axios from "axios";

const Preferences = () => {
	const appContext = React.useContext(AppContext);
	const { header } = appContext;
	const [prefGroupNum, setPrefGroupNum] = React.useState(0);
	const emptyPrefs = {
		Music: null,
		Movies: null,
		History: null,
		Politics: null,
		PC: null,
		Foreign_languages: null,
		Art_exhibitions: null,
		Religion: null,
		Countryside: null,
		outdoors: null,
		Dancing: null,
		Musical_instruments: null,
		Shopping: null,
		Science_and_technology: null,
		Theatre: null,
		Adrenaline_sports: null,
	};
	const [prefs, setPrefs] = React.useState(emptyPrefs);

	const handleChange = (e) => {
		setPrefs({
			...prefs,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("prefs: ", prefs);
		try {
			const response = await axios.put(
				"http://localhost:8000/user/updatePreferences",{preferences : prefs},
				{
					headers: header,
				}
			);
			console.log(response.data);
		} catch (err) {
			alert(`couldnt update prefs: ${err}`);
		}

	};

	React.useEffect(() => {
		console.log("!!!header: ",header)
		header &&
		(async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/user/getUserPrefs",
					{
						headers: header,
					}
				);
				console.log(response.data);

				response.data && setPrefs(response.data) ;
			} catch (err) {
				alert(`couldnt get prefs: ${err}`);
			}
		})();
	}, [header]);

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
							<Button onClick={() => setPrefGroupNum((prev) => prev - 8)}>
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
									.slice(prefGroupNum, prefGroupNum + 8)
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
						{prefGroupNum < 8 ? (
							<Button onClick={() => setPrefGroupNum((prev) => prev + 8)}>
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
