export const ToggleButtonOnOff = (props) => {
    const { selected, onClick } = props;

    return (
      <button className="toggle-button" onClick={onClick}>Orden { selected ? 'ASC' : 'DESC' }</button>
    );
}