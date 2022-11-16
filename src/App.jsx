import Form from "./components/Form";
import * as React from "react";
import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { cartReducer } from "./reducers/cartReducer";
import "./module/App.css";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { BootstrapDialogTitle } from "./components/CustomizedDialogs";
import { BootstrapDialog } from "./components/CustomizedDialogs";

function App() {
	const [state, dispatch] = useReducer(cartReducer, []);

	//Modal Dialog start
	const [open, setOpen] = React.useState(false);

	BootstrapDialogTitle.propTypes = {
		children: PropTypes.node,
		onClose: PropTypes.func.isRequired,
	};

	//Modal Dialog end

	//total price & discount start
	const Price = state.reduce((acc, obj) => {
		return acc + +obj.price * obj.count;
	}, 0);

	const Discount = state.reduce((acc, obj) => {
		return acc + +obj.discount / state.length;
	}, 0);
	//total price & discount end

	const [inputs, setInputs] = useState();
	function changeValue(key, val) {
		setInputs((prev) => ({ ...prev, [key]: val }));
	}
	function handleEdit(item) {
		setInputs(item);
		setOpen(true);
	}
	function handleSave(Id) {
		if (inputs.name && inputs.price && inputs.count && inputs.discount) {
			dispatch({ type: "save", payload: { Id, inputs } });
			setInputs();
			setOpen(false);
		} else alert("You must fill the blanks");
	}

	return (
		<div className="body_container">
			<Form dispatch={dispatch} className="formSection_container" />

			<div className="listShow_container">
				{state.length != 0 ? (
					state.map((item) => (
						<div key={uuidv4()} className="product_list">
							<div className="list_title">
								<h6>Name</h6>
								<h1>{item.name}</h1>
							</div>
							<div className="list_title">
								<h6>Price</h6>
								<h1>{item.price}$</h1>
							</div>
							<div className="list_title">
								<h6>Count</h6>
								<h1>{item.count}x</h1>
							</div>
							<div className="list_title">
								<h6>Discount</h6>
								<h1>{item.discount}%</h1>
							</div>
							<div className="list_title">
								<h6>Final Price</h6>
								<h1>
									{Math.round(
										item.price * item.count * (1 - item.discount * 0.01)
									) + " $"}
								</h1>
							</div>
							<div className="list_title">
								<h6>Actions</h6>
								<span>
									<svg
										onClick={() => dispatch({ type: "delete", payload: item })}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										id="delete"
									>
										<g>
											<path fill="none" d="M0 0h24v24H0z" />
											<path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z" />
										</g>
									</svg>
								</span>
								<span style={{ marginLeft: 5 }}>
									<svg
										onClick={() => handleEdit(item)}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										id="edit"
									>
										<g>
											<path fill="none" d="M0 0h24v24H0z" />
											<path d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" />
										</g>
									</svg>
								</span>
							</div>
						</div>
					))
				) : (
					<div className="empty_section">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-inbox"
							viewBox="0 0 16 16"
						>
							<path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z" />
						</svg>
					</div>
				)}
				<div className="final_section_wrap">
					<div>
						<h6>Total Price</h6>
						<h1>{Price}$</h1>
					</div>
					<div>
						<h6>Total Discount</h6>
						<h1>{Math.round(Discount)}%</h1>
					</div>
					<div>
						<h6>Total Payment</h6>
						<h1>{Math.round(Price * (1 - Discount / 100))}$</h1>
					</div>
				</div>
			</div>

			{inputs && (
				<div className="modal_container">
					<BootstrapDialog
						onClose={() => setOpen(false)}
						aria-labelledby="customized-dialog-title"
						open={open}
					>
						<BootstrapDialogTitle
							id="customized-dialog-title"
							onClose={() => setOpen(false)}
						>
							Edit Product
						</BootstrapDialogTitle>
						<div className="inputs_edit_section">
							<label htmlFor="">name</label>
							<input
								type="text"
								name="name"
								value={inputs.name}
								onChange={(e) => changeValue("name", e.target.value)}
							/>
						</div>
						<div className="inputs_edit_section">
							<label htmlFor="">Price</label>
							<input
								type="number"
								name="price"
								value={inputs.price}
								onChange={(e) => changeValue("price", e.target.value)}
							/>
						</div>
						<div className="inputs_edit_section">
							<label htmlFor="">Count</label>
							<input
								type="number"
								name="count"
								value={inputs.count}
								onChange={(e) => changeValue("count", e.target.value)}
							/>
						</div>
						<div className="inputs_edit_section">
							<label htmlFor="">Discount</label>
							<input
								type="range"
								name="discount"
								value={inputs.discount}
								onChange={(e) => changeValue("discount", e.target.value)}
							/>
						</div>
						<div className="main_input_div_final_price edit">
							<span>Final Price :</span>
							<span>
								{inputs.price && inputs.count && inputs.discount
									? Math.round(
											inputs.price * inputs.count * (1 - inputs.discount * 0.01)
									  ) + " $"
									: ""}
							</span>
						</div>
						<DialogActions>
							<Button autoFocus onClick={() => handleSave(inputs.id)}>
								Save changes
							</Button>
						</DialogActions>
					</BootstrapDialog>
				</div>
			)}
		</div>
	);
}

export default App;
