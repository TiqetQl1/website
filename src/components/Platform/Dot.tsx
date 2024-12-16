const Dot = ({pool, isActive, clickHandler}) => {
    const styles = {

    }

    return (
        <div
            className={isActive&&"active"}
            style={{transform:isActive&&"scale(1.5)"}}
            onClick={clickHandler}>
            *
        </div>
    )
}

export default Dot