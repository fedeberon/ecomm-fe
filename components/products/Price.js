function Price({currency, num, numSize }) {
  return (
    <>
      {currency}&nbsp;<span className={numSize}>{num}</span>
    </>
  )
}

export default Price
