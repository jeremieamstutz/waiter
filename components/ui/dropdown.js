function DropDown({ children }) {
	return <div>{children}</div>
}

function Button() {
	return <button>Button</button>
}

function Items({ children }) {
	return <div>{children}</div>
}

DropDown.Button = Button
DropDown.Items = Items
export default DropDown
