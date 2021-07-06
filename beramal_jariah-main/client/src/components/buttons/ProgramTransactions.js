function ProgramTransactions(props) {
    return (
        <div className="w-80 program-transaction-btn">
            <button type="button" className="btn btn-success w-100" onClick={() => props.action()} style={{ backgroundColor: "#006641", fontWeight: "bolder", borderRadius: 20 }}><span>{ props.title }</span></button>
        </div>
    )
}

export default ProgramTransactions
