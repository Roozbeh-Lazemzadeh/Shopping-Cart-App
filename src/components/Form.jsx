import React, { useState } from "react";
import "../module/form.css";
import { v4 as uuidv4 } from "uuid";

export default function Form({ dispatch }) {
	const [inputs, setInputs] = useState({
		name: "",
		price: 0,
		discount: 0,
		count: 0,
		isEditted: false,
	});

	function changeValue(key, val) {
		setInputs((prev) => ({ ...prev, [key]: val }));
	}

	function handleAdd(e) {
		e.preventDefault();
		if (inputs.name && inputs.price && inputs.count && inputs.discount)
			dispatch({
				type: "add",
				payload: { ...inputs, id: uuidv4() },
			});
		else alert("Please fill the form");
	}

	return (
		<form onSubmit={handleAdd}>
			<div className="main_input_div">
				<label htmlFor="name">name</label>
				<input
					type="text"
					name="name"
					value={inputs.name}
					id="name"
					onChange={(e) => changeValue("name", e.target.value)}
				/>
			</div>
			<div className="main_input_div">
				<label htmlFor="price">price</label>
				<input
					type="number"
					name="price"
					value={inputs.price}
					id="price"
					onChange={(e) => changeValue("price", e.target.value)}
				/>
			</div>
			<div className="main_input_div">
				<label htmlFor="count">count of product</label>
				<input
					type="number"
					name="count"
					id="count"
					value={inputs.count}
					onChange={(e) => changeValue("count", e.target.value)}
				/>
			</div>
			<div className="main_input_div">
				<label htmlFor="discount">discount</label>
				<input
					type="range"
					name="discount"
					value={inputs.discount}
					id="discount"
					onChange={(e) => changeValue("discount", e.target.value)}
				/>
			</div>
			<div className="main_input_div_final_price">
				<span>Final Price :</span>
				<span>
					{inputs.price && inputs.count && inputs.discount
						? Math.round(
								inputs.price * inputs.count * (1 - inputs.discount * 0.01)
						  ) + " $"
						: ""}
				</span>
			</div>
			<button className="addBtn">Add</button>
		</form>
	);
}
