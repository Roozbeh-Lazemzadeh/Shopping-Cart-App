export function cartReducer(state, action) {
	switch (action.type) {
		case "add":
			return [...state, action.payload];
		case "delete":
			return state.filter((item) => action.payload.id !== item.id);
		case "save":
			return state.map((item) => {
				if (item.id === action.payload.Id) {
					return {
						...action.payload.inputs,
					};
				} else {
					return item;
				}
			});

		default:
			return state;
	}
}
