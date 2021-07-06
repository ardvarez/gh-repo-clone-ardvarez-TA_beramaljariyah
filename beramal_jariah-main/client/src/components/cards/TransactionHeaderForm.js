/* eslint-disable jsx-a11y/img-redundant-alt */
function TransactionHeaderForm(props) {
    return (
        <div className="transaction-header-form d-flex p-3 card-bottom-shadow" style={{ borderRadius: 15 }} >
            <img src={props.image} alt="program image" width="192px" height="144px" style={{ borderRadius: 15, marginRight: 20 }} />
            <div>
                <span style={{ display: "block" }}>{ `Anda akan ber${props.program} untuk : ` }</span>
                <span style={{ fontWeight: "bolder", marginTop: 8 }} >{ props.title }</span>
            </div>
        </div>
    )
}

export default TransactionHeaderForm
