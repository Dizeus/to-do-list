
const ListHeader = ({listName}) => {
  return (
    <div className="list-header">
		<h1>{listName}</h1>
		<div className="button-container">
			<button>ADD NEW</button>
			<button>ADD NEW</button>
		</div>		
    </div>
  );
}

export default ListHeader;
