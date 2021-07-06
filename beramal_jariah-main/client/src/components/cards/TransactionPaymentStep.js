function TransactionPaymentStep(props) {
  return (
    <div className="w-80 transaction-wrapper d-flex flex-column align-items-center p-4">
      <span style={{ fontWeight: "bolder", marginBottom: 20 }}>
        Tata Cara Pembayaran
      </span>
      <div dangerouslySetInnerHTML={{ __html: props.step }}></div>
    </div>
  );
}

export default TransactionPaymentStep;
